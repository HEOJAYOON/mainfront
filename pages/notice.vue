<template>
  <v-app>
    <div class="background-container">
      <Header
        :toggleMarketPlace="toggleMarketPlace"
        :toggleGuide="toggleGuide"
        :goHome="goHome"
        :scrollToPlatformSection="scrollToPlatformSection"
        :isMarketPlaceActive="isMarketPlaceActive"
        :isGuideActive="isGuideActive"
        :isPlatformActive="isPlatformActive"
      />

      <div v-if="!isMarketPlaceActive && !isGuideActive" class="main-container">
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

            <div v-if="pagedCombinedList.length === 0" class="text-center mt-6">
              해당 검색어에 맞는 결과가 없습니다.
            </div>

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
                <div v-if="pagedNotices.length === 0" class="text-center mt-6">
                  해당 검색어에 맞는 공지사항이 없습니다.
                </div>
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
                    v-for="(item, index) in pagedSupport"
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
                  해당 검색어에 맞는 내용이 없습니다.
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
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthFetch } from '~/composables/useAuthFetch'

const mainTab = ref('notice')
const globalSearchQuery = ref('')

// 공지사항
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

const filteredNotices = computed(() => {
  const q = globalSearchQuery.value.toLowerCase().trim()
  return notice.value.filter(n => n.title.toLowerCase().includes(q))
})
const totalFiltered = computed(() => filteredNotices.value.length)
const totalPages = computed(() => Math.ceil(totalFiltered.value / pageSize))
const pagedNotices = computed(() => filteredNotices.value.slice((page.value - 1) * pageSize, page.value * pageSize))

// 고객센터
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

const filteredSupport = computed(() => {
  const q = globalSearchQuery.value.toLowerCase().trim()
  return supportList.value
    .filter(item =>
      (supportTab.value === '전체' || item.brackets === supportTab.value) &&
      item.title.toLowerCase().includes(q)
    )
})
const totalSupportFiltered = computed(() => filteredSupport.value.length)
const totalSupportPages = computed(() => Math.ceil(totalSupportFiltered.value / supportPageSize))
const pagedSupport = computed(() => filteredSupport.value.slice((supportPage.value - 1) * supportPageSize, supportPage.value * supportPageSize))

// 통합 검색
const combinedPage = ref(1)
const combinedPageSize = 10
const combinedList = computed(() => {
  const q = globalSearchQuery.value.toLowerCase().trim()
  const noticeMapped = notice.value
    .filter(n => n.title.toLowerCase().includes(q))
    .map(n => ({ ...n, type: '공지사항' }))
  const supportMapped = supportList.value
    .filter(s => s.title.toLowerCase().includes(q))
    .map(s => ({ ...s, type: '자주 묻는 질문' }))
  return [...noticeMapped, ...supportMapped].sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
})
const totalCombinedPages = computed(() => Math.ceil(combinedList.value.length / combinedPageSize))
const pagedCombinedList = computed(() => combinedList.value.slice((combinedPage.value - 1) * combinedPageSize, combinedPage.value * combinedPageSize))

watch(globalSearchQuery, () => {
  page.value = 1
  supportPage.value = 1
  combinedPage.value = 1
})

// 공통
const formatDate = (d: string) => {
  const date = new Date(d)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const fetchNoticeList = async () => {
  const { data } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice")
  notice.value = data || []
}
const fetchSupportList = async () => {
  const { data } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/fna")
  supportList.value = data || []
}

onMounted(() => {
  fetchNoticeList()
  fetchSupportList()
})

const isPlatformActive = ref(false)
const toggleMarketPlace = ref(false)
const toggleGuide = ref(false)
const isMarketPlaceActive = ref(false)
const isGuideActive = ref(false)
const scrollToPlatformSection = ref(false)
const goHome = () => {
  isMarketPlaceActive.value = false
  isGuideActive.value = false
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
  background-color: white;
  height: 100%;
}

.footer-fixed {
  flex-shrink: 0;
  height: 200px;
  padding: 20px 0;
  text-align: center;
  box-sizing: border-box;
}

.v-application {
  overflow-y: auto;
}

.search-container {
  max-width: 400px;
  margin: 20px auto;
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
</style>