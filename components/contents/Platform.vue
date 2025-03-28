<script setup lang="ts"></script>

<template>
    <div>
        <span class="title">플랫폼 소개</span>
        <div class="explain">
            <div class="explain-1">
                <div class="sub-title-div">
                    <v-icon>fiber_manual_record</v-icon>
                    <span class="sub-title">현실 객체의 디지털 표현</span>
                </div>
                <span class="content">
                    실제 세계의 물리 객체를 3D GIS 기반 공간에 디지털로 표현합니다.
                    이를 통해 객체의 속성, 상태 , 동작 등을 가상으로 표현하고, 모니터링 할 수 있습니다.
                    실제 객체는 디지털트윈 공간에 동기화되어 업데이트 되며 객체의 상태 변화를 실시간으로 반영합니다.
                </span>
            </div>
            <div class="explain-2">
                <div class="sub-title-div">
                    <v-icon>fiber_manual_record</v-icon>
                    <span class="sub-title">공간분석</span>
                </div>
                <span class="content">
                    디지털 트윈과 지리정보 시스템을 통합하여 공간을 활용하여
                    패턴, 관계, 상호 작용, 현상, 변동성 등을 반영한 시뮬레이션과 분석을 통하여 공간 정보 데이터의 의미를 해석하고 의사결정으로 활용될 수 있습니다.
                </span>
            </div>
            <div class="explain-3">
                <div class="sub-title-div">
                    <v-icon>fiber_manual_record</v-icon>
                    <span class="sub-title">실시간 데이터 수집 및 분석</span>
                </div>
                <span class="content">
                    실시간으로 수집된 지디털트윈 객체의 센서, 장치, IoT 시스템을 통해 수집된 다양한 데이터를 활용하여 공간분석, 통계, 시각화 예측 모델을 생성 할 수 있습니다.
                </span>
            </div>
            <div class="explain-4">
                <div class="sub-title-div">
                    <v-icon>fiber_manual_record</v-icon>
                    <span class="sub-title">클라우드 보안인증 취득(CSAP SaaS) 공간정보 기반 디지털 트윈 SaaS 플랫폼</span>
                </div>
                <span class="content">
                    민간/교육/공공에서 주제의 제약없이 범용적으로 사용할 수 있는 플랫폼 환경을 제공합니다.
                    또한 국가ㆍ공공기관에서 요구되는 보안 안정성과 신뢰성이 검증된 클라우드 서비스를 제공합니다.
                </span>
            </div>
        </div>
        <div class="icon-explain">
            <v-row no-gutters>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-01.png"/>
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>디지털 트윈</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-02.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>스마트시티,도시열섬 미세먼지, 도시재생</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-03.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>스마트 건설 BIM</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-04.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>스마트 빌딩 실내측위</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-05.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>도시경관 가시권 분석</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-06.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>IoT/AI융합</span>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-07.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>재난/재해/안전</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-08.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>3D, 지하공간</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-09.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>정밀도로지도 (MMS)</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-10.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>드론 관측 통합관리</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-11.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>공간정보 품질관리</span>
                        </template>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card
                        variant="outlined"
                        class="custom-card mx-auto"
                        color="surface-variant"
                        max-width="344"
                    >
                        <template v-slot:title>
                            <div class="d-flex align-center custom-title">
                                <img src="/image/main/main-info-img-12.png" />
                            </div>
                        </template>
                        <template v-slot:actions class="custom-actions">
                        <span>토지/부동산 건물/문화재</span>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 40px;
    color: rgba(0, 0, 0, 1);
    font-weight: bolder;
    display: flex;
    justify-content: center;
}

.explain {
    margin: 5% 10% 5% 10%;
}

.explain-1, .explain-2, .explain-3, .explain-4  {
    margin-bottom: 2%;
}


.sub-title {
    font-size: 23px;
    color: rgba(0, 0, 0, 1);
    font-weight: bolder;
    margin-left: 1%;
}

.custom-card {
    margin-top: 10%;
    margin-bottom: 5%;
    width: 240px;
    height: 180px;
    border-color: #eee;
}

.custom-title {
    width: 70px;
    height: 70px;
    margin-bottom: 4%;
    justify-self: center;
}

.custom-title img{
    width: 70px;
    height: 70px;
}

.custom-actions {
    flex-direction: column-reverse;
}

.custom-actions-span {
    font-size: 20px;
    color: rgba(0, 0, 0, 1);
    font-weight: bolder;
}
</style>