<template>
    <div class="pop-up pop-up-notice" id="pop-up-notice">
        <div class="pop-up-container">
            <div class="pop-up__content" id="pop-up__content-notice">
                <div class="icon icon-danger"></div>
                <div class="pop-up__text"><p v-for="(item,index) in listError" :key="index"> {{ item }} </p></div>
            </div>
            <div class="pop-up__footer">
                <button v-if="isShowBtnNo" class="button button-cancel" @click="isShowFuction(false)">
                    Không
                </button>
                <button v-if="isShowBtnCancel" class="button button-save" @click="isShowFuction(false)">
                    Hủy bỏ
                </button>
                <button v-if="isShowBtnNoSave" class="button button-nosave" @click="isShowFuction(false)">
                    Không lưu
                </button>
                <button v-if="isShowBtnSave" class="button button-save" @click="isShowFuction(false)">
                    Lưu
                </button>
                <button v-if="isShowBtnDelete" class="button button-save" @click="isShowFuction(false)">
                    Xóa
                </button>
                <button v-if="isShowBtnClose" class="button button-save" @click="isShowFuction(false)">
                    Đóng
                </button>
                <button v-if="isShowBtnConfirm" class="button button-save" @click="isShowFuction(false)">
                    Đồng ý
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"NoticePopup",
    props:{
        listError:Array,
        isShowFuction:Function,
        title:String
    },
    data(){
        return{
            isShowBtnNo:false,
            isShowBtnConfirm:false,
            isShowBtnNoSave:false,
            isShowBtnCancel:false,
            isShowBtnSave:false,
            isShowBtnClose:false,
            isShowBtnDelete:false
        }
    }
}
</script>

<style scoped>
@import url("../../assets/css/styles.css");
</style>