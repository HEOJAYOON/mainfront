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
          <v-tabs v-model="mainTab" bg-color="primary" dark fixed-tabs>
            <v-tab value="notice">공지사항</v-tab>
            <v-tab value="support">자주 묻는 질문</v-tab>
          </v-tabs>

          <v-window v-model="mainTab">
            <!-- 공지사항 탭 -->
            <v-window-item value="notice">
              
              <v-text-field
                v-model="searchQuery"
                label="제목으로 검색"
                append-icon="mdi-magnify"
                clearable
                class="mb-6"
              />
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
              <div class="text-center mb-6">
                <v-btn-toggle v-model="supportTab" color="primary" group>
                  <v-btn v-for="tab in supportTabs" :key="tab" :value="tab">
                    {{ tab }}
                  </v-btn>
                </v-btn-toggle>
              </div>
              <v-list>
                <v-list-item
                  v-for="(item, index) in filteredSupportList"
                  :key="index"
                >
                  <v-list-item-content>{{ item.title }}</v-list-item-content>
                </v-list-item>
              </v-list>
              <div v-if="filteredSupportList.length === 0" class="text-center">
                등록된 내용이 없습니다.
              </div>
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

onMounted(fetchNoticeList)
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
}

.footer-fixed {
  flex-shrink: 0;
  height: 200px;
  padding: 20px 0;
  text-align: center;
  box-sizing: border-box;
}
.v-application {
  height: auto !important;      /* 자동 높이 설정으로 콘텐츠에 따라 늘어나게 설정 */
  overflow: visible !important; /* 숨김 처리된 스크롤 활성화 */
}

</style>
