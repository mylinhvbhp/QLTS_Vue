<template>
    <div class="pop-up pop-up-notice" id="pop-up-notice">
        <div class="pop-up-container">
            <div class="pop-up__content" id="pop-up__content-notice">
                <i class="fa-solid fa-triangle-exclamation fa-danger"></i>
                <div v-if="!(this.title=='delete') || !(this.title=='deleteOne')" class="pop-up__text">
                    <p v-for="(item,index) in listError" :key="index"> {{ item }} </p>
                </div>
                <div v-if="this.title=='delete'" class="pop-up__text">
                    <p><span style="font-weight:bold">{{ this.checkedList.length }}</span> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?</p>
                </div>
                <div v-if="this.title=='deleteOne'" class="pop-up__text">
                    <p>Bạn có muốn xóa tài sản <span style="font-weight:bold">{{ this.deleteInfo.code }} - {{ this.deleteInfo.name }}</span> ?</p>
                </div>
            </div>
            <div class="pop-up__footer">
                <button v-if="isShowBtnNo" class="button button-cancel button-online" @click="isShowFuction(false)">
                    Không
                </button>
                <button v-if="isShowBtnCancel" class="button button-save button-main" @click="isShowDialogFunction(false)">
                    Hủy bỏ
                </button>
                <button v-if="isShowBtnEditCancel" class="button button-cancel button-online" @click="isShowFuction(false)">
                    Hủy bỏ
                </button>
                <button v-if="isShowBtnNoSave" class="button button-nosave button-sub" @click="isShowDialogFunction(false)">
                    Không lưu
                </button>
                <button v-if="isShowBtnSave" class="button button-save button-main" @click="saveFormInNotice()">
                    Lưu
                </button>
                <button v-if="isShowBtnDelete" class="button button-save button-main" @click="deleteRecord()">
                    Xóa
                </button>
                <button v-if="isShowBtnClose" class="button button-save button-main" @click="isShowFuction(false)">
                    Đóng
                </button>
                <button v-if="isShowBtnConfirm" class="button button-save button-main" @click="isShowFuction(false)">
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
        title:String,
        checkList: Array,
        isShowDialog:Boolean,
        filterData:Function,
        deleteInfo: Object,
        isShowDialogFunction:Function,
        toastMessageFucntion:Function,
        saveFormFunction:Function,
        resetCheckedListFunction:Function
    },
    data(){
        return{
            isShowBtnNo:false,
            isShowBtnConfirm:false,
            isShowBtnNoSave:false,
            isShowBtnCancel:false,
            isShowBtnSave:false,
            isShowBtnClose:false,
            isShowBtnDelete:false,
            isShowBtnEditCancel:false,
            checkedList:[],
        }
    },
    created(){
        try {
            //Form edit khi chọn hủy thì notice sẽ có các button Hủy bỏ, Không lưu và Lưu
            if(this.title == "edit"){
                this.isShowBtnEditCancel=true;
                this.isShowBtnNoSave=true;
                this.isShowBtnSave=true;
            }
            //Form add khi chọn hủy thì notice sẽ có các button Không, Hủy bỏ
            if(this.title == "add"){
                this.isShowBtnNo=true;
                this.isShowBtnCancel=true;
            }
            //Form xóa nhiều khi hiện notice sẽ có các button Xóa và Không
            if(this.title == "delete" || this.title == "deleteOne"){
                this.isShowBtnDelete=true;
                this.isShowBtnNo=true;
            }
            //Notice confirm thì chỉ có button Đồng ý
            if(this.title == "confirm"){
                this.isShowBtnConfirm=true;
            }

            this.checkedList=this.checkList;
        } catch (error) {
            console.log(error);
        }
    },
    methods:{
        /**
         * Xóa một hoặc nhiều bản 
         * Author: Nguyễn Thị Mỹ Linh - 20/08/2022
         */
        deleteRecord(){
            try {
                //Khi người dùng chọn icon xóa ở cột chức năng thì thêm id của bản ghi vào list xóa
                if(this.title == "deleteOne"){
                    this.checkedList.push(this.deleteInfo.id);
                }
                
                const requestOptions = {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.checkedList)
                };

                fetch("http://localhost:47555/api/v1/FixedAssets", requestOptions)
                    .then(res => {
                        res.json();
                        //Load lại dữ liệu
                        this.filterData();
                        //Mặc định xóa thành công thì checked bản ghi đầu tiên
                        this.resetCheckedListFunction();
                        //Đóng notice
                        this.isShowFuction(false);
                        this.toastMessageFucntion("Xóa");
                    })
                    .then(data => { data }) 
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Lưu thông tin form sửa khi người dùng chọn hủy bỏ rồi chọn lưu
         * Author: Nguyễn Thị Mỹ Linh - 08/09/2022
         */
        saveFormInNotice(){
            try {
                //Lưu thông tin
                this.saveFormFunction();
                //Đóng notice
                this.isShowFuction(false); 
                //Đóng dialog sửa
                this.isShowDialogFunction(false); 
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
@import url("../../../assets/css/styles.css");
</style>