<template>
    <div class="pop-up pop-up-info" id="pop-up-asset">
        <div class="pop-up-container">
            <div class="pop-up__header">
                <div v-show="title=='add'" class="pop-up-title">
                    Thêm tài sản
                </div>
                <div v-show="title=='edit'" class="pop-up-title">
                    Sửa tài sản
                </div>
                <div class="popup__close">
                    <div class="icon icon-close" @click="dialogFunction(false)"></div>
                    <span class="tooltip">Đóng</span>
                </div>
                
            </div>
            <div class="pop-up__content pop-up__content-info">
                <div class="pop-up__right">
                    <div class="form">
                        <div class="form-content">
                            <div class="form-item">
                                <div class="form-lable">Mã tài sản <span style="color:red">*</span></div>
                                <input type="text" class="input" id="txtAssetCode" name="Mã tài sản" 
                                    v-model="asset.fixedAssetCode" required tabindex="1" ref="txtAssetCode"
                                    @blur="checkInput(this.$refs['txtAssetCode'])">
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên tài sản <span style="color:red">*</span></div>
                                <input type="text" class="input" id="txtAssetName" name="Tên tài sản" 
                                    v-model="asset.fixedAssetName" placeholder="Nhập tên tài sản" required tabindex="2"
                                    ref="txtAssetName" @blur="checkInput(this.$refs['txtAssetName'])">
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Mã bộ phận sử dụng <span style="color:red">*</span> </div>
                                <msCombobox
                                    :url="'https://cukcuk.manhnv.net/api/v1/Departments'"
                                    :propValue="'DepartmentID'"
                                    :propText="'DepartmentCode'"
                                    :placeholder="'Mã bộ phận sử dụng'"
                                    v-on:getNameDepartment="getNameDepartment" 
                                    :propName="'DepartmentName'"
                                    :valueDefault="asset.departmentCode"
                                    :tabIndex="3"
                                ></msCombobox>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên bộ phận sử dụng</div>
                                <input type="text" class="input" id="txtDepartmentName" name="Tên bộ phận sử dụng" propName="department_name" v-model="asset.departmentName" disabled>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Mã loại tài sản <span style="color:red">*</span></div>
                                <msCombobox
                                    :url="'https://cukcuk.manhnv.net/api/v1/Positions'"
                                    :propValue="'PositionId'"
                                    :propText="'PositionCode'"
                                    :placeholder="'Mã loại tài sản'"
                                    v-on:getNameDepartment="getNameCategory" 
                                    :propName="'PositionName'"
                                    :tabIndex="4"
                                    :valueDefault="asset.fixedAssetCategoryCode"
                                ></msCombobox>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên loại tài sản</div>
                                <input type="text" class="input" id="txtCategoryName" name="Tên loại tài sản" 
                                    disabled v-model="asset.fixedAssetCategoryName">
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Số lượng <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('quantity')"></div>
                                        <div class="icon icon-down" @click="downNumber('quantity')"></div>
                                    </div>
                                    <input type="number" class="input input-number-icon" v-model="asset.quantity" tabindex="5" 
                                        @input="numberFormatInput($event)" ref="txtQuantity" @blur="checkInput(this.$refs['txtQuantity'])">
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Nguyên giá <span style="color:red">*</span></div>
                                <input type="text" class="input input-number" v-model="asset.cost" tabindex="6" @change="updateRate()"
                                    @input="numberFormatInput($event)" ref="txtCost" @blur="checkInput(this.$refs['txtCost'])">
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Tỉ lệ hao mòn (%) <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('depreciation_rate')"></div>
                                        <div class="icon icon-down" @click="downNumber('depreciation_rate')"></div>
                                    </div>
                                    <input type="number" class="input input-number-icon" v-model="asset.depreciationRate" tabindex="7" @change="updateRate()" 
                                        @input="numberFormatInput()" ref="txtDepreciationRate" @blur="checkInput(this.$refs['txtDepreciationRate'])"> 
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Ngày mua <span style="color:red">*</span></div>
                                <input type="date" class="input" id="txt" name="Ngày mua" v-model="asset.purchaseDate" required tabindex="8" 
                                    ref="txtPurchaseDate" @blur="checkInput(this.$refs['txtPurchaseDate'])">
                                <Datepicker v-model="asset.purchaseDate"/>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Ngày bắt đầu sử dụng <span style="color:red">*</span></div>
                                <input type="date" class="input" id="txtProductionYear" name="Ngày bắt đầu sử dụng" v-model="asset.productionDate" required tabindex="9"
                                    ref="txtProductionDate" @blur="checkInput(this.$refs['txtProductionDate'])">
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Năm theo dõi</div>
                                <input type="text" class="input input-number" v-model="asset.trackedYear" disabled>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Số năm sử dụng <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('life_time')"></div>
                                        <div class="icon icon-down" @click="downNumber('life_time')"></div>
                                    </div>
                                    <input type="number" class="input input-number-icon" v-model="asset.lifeTime" tabindex="10" @change="updateRate()"
                                        ref="txtLifeTime" @blur="checkInput(this.$refs['txtLifeTime'])">
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Giá trị hao mòn năm <span style="color:red">*</span></div>
                                <input type="text" class="input input-number" v-model="asset.depreciationValue" tabindex="11" @input="numberFormat()"
                                    ref="txtDepreciationValue" @blur="checkInput(this.$refs['txtDepreciationValue'])">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-up__footer">
                <button class="button button-cancel" 
                    @click="cancelForm()" 
                    tabindex="13"
                    @keydown.tab.prevent="processTab"
                >
                    Hủy bỏ
                </button>
                <button class="button button-save" id="pop-up__btnSave" tabindex="12" @click="saveForm()">
                    Lưu
                </button>
            </div>
        </div>
    </div>

    <assetNotice
     v-if="isShowNotice"
     :listError="messageList"
     :isShowFuction="closeNotice"
     :title="titleMessage"
    >
    </assetNotice>
</template>

<script>
import assetNotice from './AssetNotice.vue'
import axios from 'axios'
import {numberFormatInput} from '../../../assets/js/common';

export default {
    name:"AssetDetail",
    components:{
        assetNotice
    },
    props:{
        isShowDialog:{
            type:Boolean,
            default:false,
        },
        assetSelected: Object,
        title: String,
        dialogFunction: Function
    },
    data(){
        return{
            nameDepartment: '',
            nameCategory: '',
            asset:{
                fixedAssetCode:'', 
                fixedAssetName:'', 
                fixedAssetDescreption:'', 
                departmentCode:'', 
                departmentName:'', 
                fixedAssetCategoryCode:'', 
                fixedAssetCategoryName:'', 
                quantity:0, 
                cost:0,
                lifeTime:0, 
                depreciationRate:0, 
                depreciationValue:0,
                trackedYear:'', 
                purchaseDate:'', 
                productionDate:''
            },
            depreciationValue:0,
            isShowNotice:false,
            messageList:[],
            message:"",
            titleMessage:""
        }
        
    },

    created(){
        this.titleMessage=this.title;
        this.updateRate();
        if(this.title=="add"){
            axios.get("http://localhost:47555/api/v1/FixedAssets/new-code")
            .then(response => {
                this.asset.fixedAssetCode = response.data
            })
            .catch(e => {
                console.log(e);
            })
        }
        if(this.title == "edit"){
            this.asset=this.assetSelected;
        }
    },
    //4.Mount
    mounted(){
        this.$refs.txtAssetCode.focus();
    },
   
    methods:{    
        /**
         * Form number, date, ... 
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        numberFormatInput(event){
            try {
                var value = event.currentTarget.value;
                if(value){
                    value = numberFormatInput(value);
                    event.currentTarget.value = value;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tự động điền Tên bộ phận vào textbox Tên bộ phận khi chọn combobox Mã bộ phận
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getNameDepartment(name) {
            try {
                this.asset.department_name = name;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tự động điền Tên loại tài sản vào textbox Tên bộ phận khi chọn combobox Mã tài sản
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getNameCategory(name) {
            try {
                this.asset.fixed_asset_category_name = name
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tăng số 
         * Author: Nguyễn Thi Mỹ Linh - 14/08/2022
         */
        upNumber(input){
            try {
                if(input=="quantity"){
                    this.asset.quantity++;
                }
                else if(input == "depreciation_rate"){
                    this.asset.depreciation_rate++;
                    this.updateRate();
                }
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Giảm số 
         * Author: Nguyễn Thi Mỹ Linh - 14/08/2022
         */
        downNumber(input){
            try {
                if(input=="quantity"){
                    this.asset.quantity--;
                }
                else if(input == "depreciation_rate"){
                    this.asset.depreciation_rate--;
                    this.updateRate();
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tính giá trị hao mòn khi thay đổi Tỉ lệ hao mòn hoặc Nguyên giá
         * Author: Nguyễn Thi Mỹ Linh - 14/08/2022
         */
        updateRate(){
            try {
                this.depreciationValue = this.asset.cost * (this.asset.depreciation_rate/100);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Vòng lặp trong form khi ấn Tab/Shift 
         * Author: Nguyễn Thi Mỹ Linh - 14/08/2022
         */
        processTab(){
            try {
                this.$refs.txtAssetCode.focus();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Cảnh báo những trường thông tin bắc buộc khi bị bỏ trống
         * Author: Nguyễn Thị Mỹ Linh - 21/08/2022
         */
        checkInput(input){
            try {
                if (!input.value) {
                    input.classList.add("border-red");
                }
                else {
                    input.classList.remove("border-red");
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Validate form
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        saveForm(){
            try {
                this.messageList=[];
                if(!this.asset.fixed_asset_code){

                    this.messageList.push("Mã tài sản không được để trống!");
                }
                if(!this.asset.fixed_asset_name){
                    this.messageList.push("Tên tài sản không được để trống!")
                }
                if(!this.asset.department_code){
                    this.messageList.push("Mã bộ phận sử dụng không được để trống!")
                }
                if(!this.asset.fixed_asset_category_code){
                    this.messageList.push("Mã loại tài sản không được để trống!")
                }
                if(!this.asset.quantity){
                    this.messageList.push("Số lượng không được để trống!")
                }
                if(!this.asset.cost){
                    this.messageList.push("Nguyên giá không được để trống!")
                }
                if(!this.asset.depreciation_rate){
                    this.messageList.push("Tỉ lệ hao mòn không được để trống!")
                }
                if(!this.asset.purchase_date){
                    this.messageList.push("Ngày mua không được để trống!")
                }
                if(!this.asset.production_date){
                    this.messageList.push("Ngày sử dụng không được để trống!")
                }
                if(!this.asset.life_time){
                    this.messageList.push("Số năm sử dụng không được để trống!")
                }
                if(!this.asset.life_time){
                    this.messageList.push("Số năm sử dụng không được để trống!")
                }

                if(this.messageList.length!=0){
                    this.isShowNotice=true;
                    this.titleMessage="confirm";
                }
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Khi người dùng chọn hủy
         * Author: Nguyễn Thị Mỹ Linh -18/0/2022
         */
        cancelForm(){
            try {
                this.messageList=[]
                if(this.title=="add"){
                    this.messageList.push("Bạn có muốn hủy bỏ khai báo tài sản này?");
                    this.titleMessage="add";
                }
                else if(this.title=="edit"){
                    this.messageList.push("Thông tin thay đổi sẽ không được cập nhập nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?")
                    this.titleMessage="edit";
                }else{
                    this.messageList.push("Đã có lỗi xảy ra");
                }
                this.isShowNotice=true;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Sự kiện đóng thông báo
         * Author: Nguyễn Thị Mỹ Linh - 20/08/2022
         */
        closeNotice(isShowNotice){
            try {
                this.isShowNotice=isShowNotice;
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