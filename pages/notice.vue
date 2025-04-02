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
          <h1 class="text-center mt-6 mb-6">고객센터</h1>
          <v-tabs v-model="mainTab" class="custom-tabs" fixed-tabs>
            <v-tab value="notice">공지사항</v-tab>
            <v-tab value="support">자주 묻는 질문</v-tab>
          </v-tabs>

          <v-window v-model="mainTab">
            <!-- 공지사항 탭 -->
            <v-window-item value="notice">
              
              <div class="search-container">
                <v-text-field
                  v-model="searchQuery"
                  label="제목으로 검색"
                  append-icon="mdi-magnify"
                  clearable
                  density="compact"
                  hide-details
                />
              </div>
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
                <v-btn-toggle v-model="supportTab" color="primary" group>
                  <v-btn v-for="tab in supportTabs" :key="tab" :value="tab">
                    {{ tab }}
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- 검색창 -->
              <div class="search-container">
                <v-text-field
                  v-model="supportSearchQuery"
                  label="제목으로 검색"
                  append-icon="mdi-magnify"
                  clearable
                  density="compact"
                  hide-details
                />
              </div>

              <!-- 리스트 -->
              <v-expansion-panels multiple>
                <v-expansion-panel
                  v-for="(item, index) in pagedSupport"
                  :key="item.bid"
                >
                  <v-expansion-panel-title>
                    <div class="d-flex justify-space-between w-100">
                      <small>{{ totalSupportFiltered - ((supportPage - 1) * supportPageSize + index) }}</small>
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
        </v-container>
      </div>
      <LazyFooter class="footer-fixed" />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthFetch } from '~/composables/useAuthFetch'

const mainTab = ref('notice')

interface NoticeItem {
  id: string
  title: string
  regDate: string
  viewCnt: number
  content: string
}

const notice = ref<NoticeItem[]>([])
const searchQuery = ref('')
const page = ref(1)
const pageSize = 10

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

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const fetchNoticeList = async () => {
  const { data } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/notice", { method: 'GET' })
  notice.value = data || []
}

const filteredAndSorted = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return [...notice.value]
    .filter(item => item.title.toLowerCase().includes(query))
    .sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
})

const totalFiltered = computed(() => filteredAndSorted.value.length)
const totalPages = computed(() => Math.ceil(totalFiltered.value / pageSize))
const pagedNotices = computed(() => filteredAndSorted.value.slice((page.value - 1) * pageSize, page.value * pageSize))

const supportSearchQuery = ref('')
const supportPage = ref(1)
const supportPageSize = 10

const filteredAndSortedSupport = computed(() => {
  const query = supportSearchQuery.value.trim().toLowerCase()
  return supportTab.value === '전체'
    ? supportList.value
        .filter(item => item.title.toLowerCase().includes(query))
        .sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
    : supportList.value
        .filter(item => item.brackets === supportTab.value && item.title.toLowerCase().includes(query))
        .sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
})

const totalSupportFiltered = computed(() => filteredAndSortedSupport.value.length)
const totalSupportPages = computed(() => Math.ceil(totalSupportFiltered.value / supportPageSize))
const pagedSupport = computed(() => filteredAndSortedSupport.value.slice((supportPage.value - 1) * supportPageSize, supportPage.value * supportPageSize))

watch(supportSearchQuery, () => supportPage.value = 1)

onMounted(() => {
  fetchNoticeList()
  fetchSupportList()
})

watch(searchQuery, () => page.value = 1)

const supportTab = ref('전체')
const supportTabs = ['전체', '지도', '데이터', '기능', '회원가입 및 탈퇴', '결제']

interface SupportItem {
  bid: number
  title: string
  content: string
  regDate: string
  brackets: string
  viewCnt: number
}

const supportList = ref<SupportItem[]>([])

const fetchSupportList = async () => {
  const { data } = await useAuthFetch("http://192.168.1.215:9090/api/v1/board/list/fna", {
    method: 'GET',
  })

  supportList.value = data || []
}

const filteredSupportList = computed(() =>
  supportTab.value === '전체'
    ? supportList.value
    : supportList.value.filter(item => item.brackets === supportTab.value)
)

onMounted(() => {
  fetchNoticeList()
  fetchSupportList()
})
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

.custom-tabs {
  background: transparent !important;
}

.custom-tabs .v-tab {
  color: #555; /* 탭 글자 색상 */
  background-color: transparent !important;
  border-radius: 0 !important;
}

.custom-tabs .v-tab--selected {
  color: #1976D2; /* 선택된 탭 글자 색상 (primary 컬러) */
}

.custom-tabs .v-slide-group__content {
  border-bottom: 1px solid #e0e0e0; /* 전체 탭 하단 경계선 */
}

.custom-tabs .v-tabs-slider {
  height: 3px !important; /* 선택된 탭 아래 밑줄 두께 */
  background-color: #1976D2 !important; /* 밑줄 색상 */
}

.search-container {
  max-width: 400px; /* 원하는 너비로 조정 가능 */
  margin: 30px auto;   /* 가운데 정렬 */
}

</style>
