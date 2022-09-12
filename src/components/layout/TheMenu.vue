<template>
    <div class="menu" :class="{open:isShowMenu}">
        <div class="menu-content">
            <div class="menu-top">
                <div class="menu-logo">
                    <div class="icon-logo icon"></div>
                </div>
                <div class="menu-text" id="menu-name">
                    MISA QLTS
                </div>
            </div>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-dashboard"></div>
                    <span class="tooltip">Tổng quan</span>
                </div>
                <div class="menu-title">Tổng quan</div>
            </router-link>
            <router-link to="/assets" class="menu-item menu-item-active">
                    <div class="menu-icon menu-icon-active">
                        <div class="icon icon-item icon-asset"></div>
                        <span class="tooltip">Tài sản</span>
                    </div>
                    <div class="menu-title">
                        <div class="title-text">Tài sản</div> 
                        <div class="icon icon-item icon-toggle"></div>
                    </div>
            </router-link>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-assetHtdb"></div>
                    <span class="tooltip">Tài sản HT-ĐB</span>
                </div>
                <div class="menu-title">
                    <div class="title-text">Tài sản HT-ĐB</div> 
                    <div class="icon icon-item icon-toggle"></div>
                </div>
            </router-link>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-tool"></div>
                    <span class="tooltip">Công cụ dụng cụ</span>
                </div>
                <div class="menu-title">
                    <div class="title-text">Công cụ dụng cụ</div> 
                    <div class="icon icon-item icon-toggle"></div>
                </div>
            </router-link>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-category"></div>
                    <span class="tooltip">Danh mục</span>
                </div>
                <div class="menu-title">
                    <div class="title-text">Danh mục</div>
                </div>
            </router-link>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-search"></div>
                    <span class="tooltip">Tra cứu</span>
                </div>
                <div class="menu-title">
                    <div class="title-text">Tra cứu</div> 
                    <div class="icon icon-item icon-toggle"></div>
                </div>
            </router-link>
            <router-link to="/assets" class="menu-item">
                <div class="menu-icon">
                    <div class="icon icon-item icon-report"></div>
                    <span class="tooltip">Báo cáo</span>
                </div>
                <div class="menu-title">
                    <div class="title-text">Báo cáo</div> 
                    <div class="icon icon-item icon-toggle"></div>
                </div>
            </router-link>
        </div>
        <div class="menu-bottom">
            <div class="open-menu" @click="openMoreMenu()">
                <div class="icon icon-item icon-more" id="btn-open-menu"></div>
                <span class="tooltip">Mở rộng menu</span>
            </div>
            <div class="close-menu" @click="closeMoreMenu()">
                <div class="icon icon-item icon-less" id="btn-close-menu"></div>
                <span class="tooltip">Thu nhỏ menu</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheMenu",
    data(){
        return{
            isShowMenu:false
        }
    },
    methods:{
        /**
         * Mở rộng menu
         * Linh - 2/8/2022
         */
        openMoreMenu(){
            try {
                this.isShowMenu = true;
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Đóng mở rộng menu
         * Linh - 2/8/2022
         */
        closeMoreMenu(){
            try {
                this.isShowMenu = false;
            } catch (error) {
                console.log(error);
            }
        } 
    }
}
</script>

<style scoped>
@import url("../../assets/css/styles.css");
</style>