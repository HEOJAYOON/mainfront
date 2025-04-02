<template>
  <v-app>
    <div class="background-container">
      <Header
        :toggleMarketPlace="ui.toggleMarketPlace"
        :toggleGuide="ui.toggleGuide"
        :goHome="goHome"
        :scrollToPlatformSection="ui.scrollToPlatformSection"
        :isMarketPlaceActive="ui.isMarketPlaceActive"
        :isGuideActive="ui.isGuideActive"
        :isPlatformActive="ui.isPlatformActive"
      />

      <div v-if="!ui.isMarketPlaceActive && !ui.isGuideActive" class="main-container">
        <v-container>
          <h1 class="text-center">고객센터</h1>

          <!-- 공통 검색창 -->
          <div class="search-container">
            <v-text-field
              v-model="globalSearchQuery"
              label="제목으로 검색"
              append-icon="mdi-magnify"
              clearable
              density="compact"
              hide-details
            />
          </div>

          <!-- 검색어 있을 때 통합 결과 -->
          <template v-if="globalSearchQuery">
            <div class="text-center font-weight-medium my-4">
              <span>
                <strong>‘{{ globalSearchQuery }}’</strong>로 검색한 결과
                <strong>{{ combinedList.length }}</strong>건
              </span>
            </div>
            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="(item, index) in pagedCombinedList"
                :key="index"
              >
                <v-expansion-panel-title>
                  <div class="d-flex justify-space-between w-100">
                    <small>{{ item.type }}</small>
                    <span>{{ item.title }}</span>
                    <small>{{ formatDate(item.regDate) }} / 조회수 {{ item.viewCnt }}</small>
                  </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div v-html="item.content" class="pa-4" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-pagination v-model="combinedPage" :length="totalCombinedPages" class="mt-8" />
          </template>

          <!-- 검색어 없을 때 탭 구분 -->
          <template v-else>
            <v-tabs v-model="mainTab" class="custom-tabs" fixed-tabs>
              <v-tab value="notice">공지사항</v-tab>
              <v-tab value="support">자주 묻는 질문</v-tab>
            </v-tabs>

            <v-window v-model="mainTab">
              <!-- 공지사항 탭 -->
              <v-window-item value="notice">
                <v-expansion-panels multiple>
                  <v-expansion-panel
                    v-for="(item, index) in pagedNotices"
                    :key="item.id"
                  >
                    <v-expansion-panel-title>
                      <div class="d-flex justify-space-between w-100">
                        <small>{{ totalFiltered - ((page - 1) * pageSize + index) }}</small>
                        <span>{{ item.title }}</span>
                        <small>{{ formatDate(item.regDate) }} / 조회수 {{ item.viewCnt }}</small>
                      </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div v-html="item.content" class="pa-4" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-pagination v-model="page" :length="totalPages" class="mt-8" />
              </v-window-item>

              <!-- 고객센터 탭 -->
              <v-window-item value="support">
                <!-- 버튼 필터 -->
                <div class="text-center mb-4">
                  <v-btn-toggle v-model="supportTab" class="custom-toggle" group>
                    <v-btn 
                      v-for="tab in supportTabs"
                      :key="tab"
                      :value="tab"
                      class="custom-tab-btn"
                    >
                      {{ tab }}
                    </v-btn>
                  </v-btn-toggle>
                </div>

                <!-- 리스트 -->
                <v-expansion-panels multiple>
                  <v-expansion-panel
                    v-for="item in pagedSupport"
                    :key="item.bid"
                  >
                    <v-expansion-panel-title>
                      <div class="d-flex justify-space-between w-100">
                        <small>Q</small>
                        <span>{{ item.title }}</span>
                        <small>{{ formatDate(item.regDate) }} / 조회수 {{ item.viewCnt }}</small>
                      </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <div v-html="item.content" class="pa-4" />
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>

                <!-- 빈 리스트 처리 -->
                <div v-if="pagedSupport.length === 0" class="text-center mt-6">
                  표시할 내용이 없습니다.
                </div>
                <!-- 페이징 -->
                <v-pagination v-model="supportPage" :length="totalSupportPages" class="mt-8" />
              </v-window-item>
            </v-window>
          </template>
        </v-container>
      </div>
      <LazyFooter class="footer-fixed" />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useAuthFetch } from '~/composables/useAuthFetch'

// UI 상태를 하나의 reactive 객체로 묶음
const ui = reactive({
  isPlatformActive: false,
  isMarketPlaceActive: false,
  isGuideActive: false,
  toggleMarketPlace: false,
  toggleGuide: false,
  scrollToPlatformSection: false,
})

// 메인 탭과 검색어
const mainTab = ref('notice')
const globalSearchQuery = ref('')

// 검색어를 미리 가공(소문자, 양쪽 공백 제거)하여 재사용
const searchQuery = computed(() => globalSearchQuery.value.toLowerCase().trim())

// ── 공지사항 (Notice) ──────────────────────────────
interface NoticeItem {
  id: string
  title: string
  regDate: string
  viewCnt: number
  content: string
}
const notice = ref<NoticeItem[]>([])
const page = ref(1)
const pageSize = 10

const filteredNotices = computed(() =>
  notice.value.filter(n => n.title.toLowerCase().includes(searchQuery.value))
)
const totalFiltered = computed(() => filteredNotices.value.length)
const totalPages = computed(() => Math.ceil(totalFiltered.value / pageSize))
const pagedNotices = computed(() =>
  filteredNotices.value.slice((page.value - 1) * pageSize, page.value * pageSize)
)

// ── 고객센터 (Support) ──────────────────────────────
interface SupportItem {
  bid: number
  title: string
  content: string
  regDate: string
  brackets: string
  viewCnt: number
}
const supportList = ref<SupportItem[]>([])
const supportTab = ref('전체')
const supportTabs = ['전체', '지도', '데이터', '기능', '회원가입 및 탈퇴', '결제']
const supportPage = ref(1)
const supportPageSize = 10

const filteredSupport = computed(() =>
  supportList.value.filter(item =>
    (supportTab.value === '전체' || item.brackets === supportTab.value) &&
    item.title.toLowerCase().includes(searchQuery.value)
  )
)
const totalSupportFiltered = computed(() => filteredSupport.value.length)
const totalSupportPages = computed(() => Math.ceil(totalSupportFiltered.value / supportPageSize))
const pagedSupport = computed(() =>
  filteredSupport.value.slice((supportPage.value - 1) * supportPageSize, supportPage.value * supportPageSize)
)

// ── 통합 검색 (Combined List) ──────────────────────────────
const combinedPage = ref(1)
const combinedPageSize = 10
const combinedList = computed(() => {
  const noticeMapped = notice.value
    .filter(n => n.title.toLowerCase().includes(searchQuery.value))
    .map(n => ({ ...n, type: '공지사항' }))
  const supportMapped = supportList.value
    .filter(s => s.title.toLowerCase().includes(searchQuery.value))
    .map(s => ({ ...s, type: '자주 묻는 질문' }))
  return [...noticeMapped, ...supportMapped].sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
})
const totalCombinedPages = computed(() => Math.ceil(combinedList.value.length / combinedPageSize))
const pagedCombinedList = computed(() =>
  combinedList.value.slice((combinedPage.value - 1) * combinedPageSize, combinedPage.value * combinedPageSize)
)

// 검색어 변경 시 페이지 초기화
watch(globalSearchQuery, () => {
  page.value = 1
  supportPage.value = 1
  combinedPage.value = 1
})

// ── 공통 헬퍼 ──────────────────────────────
const formatDate = (d: string) => {
  const date = new Date(d)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// API 호출을 병렬로 처리하여 데이터 가져오기
const fetchData = async () => {
  const [noticeRes, supportRes] = await Promise.all([
    useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice"),
    useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/fna")
  ])
  notice.value = noticeRes.data || []
  supportList.value = supportRes.data || []
}

onMounted(fetchData)

// 홈 이동 시 마켓플레이스 및 가이드 상태 리셋
const goHome = () => {
  ui.isMarketPlaceActive = false
  ui.isGuideActive = false
}
</script>

<style scoped>
.background-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  flex: 1;
  width: 90%;
  max-width: 1200px;
  margin: 80px auto 0;
  height: }

.footer-fixed {
  height: 200px;
  flex-shrink: 0;
  padding: 20px 0;
  text-align: center;
  box-sizing: border-box;
}

.search-container {
  max-width: 400px;
  margin: 20px auto;
}

::v-deep .v-expansion-panel--active .v-expansion-panel-title {
  background-color: #f0f0f0;
}
.custom-tabs {
  background: transparent !important;
}

.custom-tabs .v-tab {
  color: #555;
  background-color: transparent !important;
  border-radius: 0 !important;
}

.custom-tabs .v-tab--selected {
  color: #1740C2;
}

.custom-tabs .v-slide-group__content {
  border-bottom: 1px solid #e0e0e0;
}

.custom-tabs .v-tabs-slider {
  height: 3px !important;
  background-color: #1740C2 !important;
}

.custom-toggle {
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
}

.custom-tab-btn {
  min-height: 32px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #d0d5dd;
  color: #333;
  text-transform: none;
}

.custom-tab-btn.v-btn--active {
  background-color: #1740C2;
  color: white;
  border-color: #1740C2;
}

.v-footer {
  flex:block;
}

</style>
