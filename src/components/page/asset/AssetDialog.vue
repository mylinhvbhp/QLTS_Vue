<template>
    <div class="pop-up pop-up-info" id="pop-up-asset" 
        @keydown.enter.prevent="saveForm(asset)"
        @keyup.esc.prevent="isShowDialogFunction(false)"
    >
        <div class="pop-up-container">
            <div class="pop-up__header">
                <div v-show="title=='add'" class="pop-up-title">
                    Thêm tài sản
                </div>
                <div v-show="title=='copy'" class="pop-up-title">
                  Nhân bản tài sản
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
                                <div class="form-input" id="txtAssetCode">
                                    <input type="text" class="input" 
                                        name="Mã tài sản" 
                                        v-model="asset.fixedAssetCode" 
                                        tabindex="1" 
                                        ref="txtAssetCode"
                                        @blur="checkInput('txtAssetCode',this.$refs['txtAssetCode'])" 
                                        maxlength="20"
                                        required
                                    >
                                    <div class="tooltip" style="color:red; margin-top:-70px">Mã tài sản không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên tài sản <span style="color:red">*</span></div>
                                <div class="form-input" id="txtAssetName">
                                    <input type="text" class="input" 
                                        name="Tên tài sản" 
                                        v-model="asset.fixedAssetName" 
                                        placeholder="Nhập tên tài sản" 
                                        tabindex="2"
                                        ref="txtAssetName" 
                                        @blur="checkInput('txtAssetName',this.$refs['txtAssetName'])" 
                                        maxlength="225"
                                        required
                                    >
                                    <div class="tooltip" style="color:red; margin-top:-70px">Tên tài sản không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Mã bộ phận sử dụng <span style="color:red">*</span> </div>
                                <msCombobox
                                    :url="'http://localhost:47555/api/v1/Departments'"
                                    :propValue="'DepartmentID'"
                                    :propText="'DepartmentName'"
                                    :placeholder="'Mã bộ phận sử dụng'"
                                    @getName="getNameDepartment" 
                                    :propCode="'DepartmentCode'"
                                    :valueDefault="asset.departmentCode"
                                    :tabIndex="3"
                                    :typeCombobox="typeCombobox"
                                    :validateCombobox="validateCombobox"
                                ></msCombobox>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên bộ phận sử dụng</div>
                                <input type="text" 
                                    class="input" 
                                    id="txtDepartmentName" 
                                    name="Tên bộ phận sử dụng"
                                    propName="department_name" 
                                    v-model="asset.departmentName" 
                                    disabled>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Mã loại tài sản <span style="color:red">*</span></div>
                                <msCombobox
                                    :url="'http://localhost:47555/api/v1/FixedAssetCategorys'"
                                    :propValue="'FixedAssetCategoryID'"
                                    :propText="'FixedAssetCategoryName'"
                                    :placeholder="'Mã loại tài sản'"
                                    @getName="getNameCategory" 
                                    :propCode="'FixedAssetCategoryCode'"
                                    :tabIndex="4"
                                    :valueDefault="asset.fixedAssetCategoryCode"
                                    :typeCombobox="typeCombobox"
                                    :validateCombobox="validateCombobox"
                                ></msCombobox>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên loại tài sản</div>
                                <input type="text" 
                                    class="input" 
                                    id="txtCategoryName" 
                                    name="Tên loại tài sản" 
                                    v-model="asset.fixedAssetCategoryName" 
                                    disabled >
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Số lượng <span style="color:red">*</span></div>
                                <div class="form-input" id="txtQuantity">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('quantity')"></div>
                                        <div class="icon icon-down" @click="downNumber('quantity')"></div>
                                    </div>
                                    <input type="number" 
                                        class="input input-number-icon" 
                                        min="0"
                                        v-model="asset.quantity" 
                                        tabindex="5" 
                                        @input="numberFormatInput()" 
                                        ref="txtQuantity" 
                                        @blur="checkInputNumber('txtQuantity',this.$refs['txtQuantity'])"
                                    >
                                    <div class="tooltip" style="color:red; margin-top:-70px">Số lượng không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Nguyên giá <span style="color:red">*</span></div>
                                <div class="form-input" id="txtCost">
                                    <input type="text" 
                                        class="input input-number" 
                                        v-model="asset.cost" 
                                        tabindex="6" 
                                        @change="updateDepreciationValue()"
                                        @input="numberFormatInput()" 
                                        ref="txtCost" 
                                        @blur="checkInputNumber('txtCost',this.$refs['txtCost'])"
                                    >
                                    <div class="tooltip" style="color:red ; margin-top:-70px">Nguyên giá không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Số năm sử dụng <span style="color:red">*</span></div>
                                <div class="form-input" id="txtLifeTime">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('life_time')"></div>
                                        <div class="icon icon-down" @click="downNumber('life_time')"></div>
                                    </div>
                                    <input type="number" 
                                        class="input input-number-icon" 
                                        v-model="asset.lifeTime" 
                                        tabindex="7"
                                        @change="updateDepreciationRate()"
                                        ref="txtLifeTime" 
                                        @blur="checkInputNumber('txtLifeTime',this.$refs['txtLifeTime'])"
                                    >
                                    <div class="tooltip" style="color:red; margin-top:-70px">Số năm sử dụng không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Tỉ lệ hao mòn (%) <span style="color:red">*</span></div>
                                <div class="form-input" id="txtDepreciationRate">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('depreciation_rate')"></div>
                                        <div class="icon icon-down" @click="downNumber('depreciation_rate')"></div>
                                    </div>
                                    <input type="number" 
                                        class="input input-number-icon" 
                                        v-model="asset.depreciationRate" 
                                        tabindex="8" 
                                        @change="updateDepreciationValue();" 
                                        @input="numberFormatInput()" 
                                        ref="txtDepreciationRate"
                                        @blur="checkInputNumber('txtDepreciationRate',this.$refs['txtDepreciationRate'])"
                                        :class="{'border-red':isShowErrorRate}"
                                    > 
                                    <div class="tooltip" style="color:red; margin-top:-70px">Tỉ lệ hao mòn không được bỏ trống</div>
                                    <div class="tooltip1" style="color:red; margin-top:-70px">Tỉ lệ hao mòn phải &#60;= {{ Math.round(((1/this.asset.lifeTime)*100)*100)/100 }}</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Giá trị hao mòn năm <span style="color:red">*</span></div>
                                <div class="form-input" id="txtDepreciationValue">
                                    <input type="text" 
                                        class="input input-number" 
                                        v-model="asset.depreciationValue" 
                                        tabindex="9"
                                        @input="numberFormatInput()"
                                        ref="txtDepreciationValue" 
                                        @blur="checkInputNumber('txtDepreciationValue',this.$refs['txtDepreciationValue'])"
                                        @change="checkDepreaciationValue()"
                                    >
                                    <div class="tooltip" style="color:red; margin-top:-70px">Giá trị hao mòn không được bỏ trống</div>
                                    <div class="tooltip1" style="color:red; margin-top:-70px">Giá trị hao mòn phải &#60;= {{this.depreciationValue}}</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Năm theo dõi</div>
                                <input type="text" class="input input-number" v-model="asset.trackedYear" disabled>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Ngày mua <span style="color:red">*</span></div>
                                <Datepicker v-model="asset.purchaseDate" 
                                    placeholder="DD/MM/YYYY"
                                    :hideInput="false"
                                    format="dd/MM/yyyy"
                                    tabindex="10"
                                />
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Ngày bắt đầu sử dụng <span style="color:red">*</span></div>
                                <Datepicker v-model="asset.productionDate" 
                                    placeholder="DD/MM/YYYY"
                                    :hideInput="false"
                                    format="dd/MM/yyyy"
                                    tabindex="11"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-up__footer">
                <button class="button button-cancel button-online" 
                    @click="cancelForm()" 
                    tabindex="13"
                    @keydown.tab.prevent="processTab"
                >
                    Hủy
                </button>
                <button class="button button-save button-main" 
                    id="pop-up__btnSave" 
                    tabindex="12" 
                    @click="saveForm()"
                >
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
     :isShowDialog="isShowDialog"
     :isShowDialogFunction="isShowDialogFunction"
     :saveFormFunction="saveForm"
    >
    </assetNotice>
</template>

<script>
import assetNotice from './AssetNotice.vue'
import axios from 'axios'
import {numberFormat, formatNumber} from '../../../assets/js/common';
import Datepicker from 'vuejs3-datepicker';
import { uuid } from 'vue-uuid' 

export default {
    name:"AssetDetail",
    components:{
        assetNotice,
        Datepicker
    },
    props:{
        isShowDialog:{
            type:Boolean,
            default:false,
        },
        assetSelected: Object,
        title: String,
        dialogFunction: Function,
        isShowDialogFunction:Function,
        filterData: Function,
        toastMessageFucntion:Function
    },
    data(){
        return{
            nameDepartment: '',
            nameCategory: '',
            asset:{
                fixedAssetCode:'', 
                fixedAssetName:'', 
                fixedAssetDescreption:'',
                departmentID:'', 
                departmentCode:'', 
                departmentName:'', 
                fixedAssetCategoryID:'',
                fixedAssetCategoryCode:'', 
                fixedAssetCategoryName:'', 
                quantity:0, 
                cost:0,
                lifeTime:0, 
                depreciationRate:0, 
                depreciationValue:0,
                trackedYear:new Date().getFullYear(), 
                purchaseDate:new Date(), 
                productionDate:new Date(),
                createdBy:'',
                createdDate:new Date(),
                modifiedDate:new Date(),
                modifiedBy:''
            },
            dataAsset:{},
            depreciationValue:0,
            isShowNotice:false,
            messageList:[],
            validateList:[],
            message:"",
            titleMessage:"",
            typeCombobox:"comboboxForm",
            showTooltip:false,
            validateCombobox:false,
            isShowErrorRate:false,

        }
        
    },

    created(){
        this.titleMessage=this.title;
        if(this.title=="edit" || this.title=="copy"){
            this.asset=this.assetSelected;
        }
        this.numberFormatInput();
        this.updateDepreciationValue();
        if(this.title=="add" || this.title=="copy"){
            this.newCode();
        }

    },
    mounted(){
        //Mặc định đặt con trỏ vào textbox đầu tiên
        this.$refs.txtAssetCode.focus();
    },
   
    methods:{  
        
        /**
         * Sinh mẫ tự động
         * Author:Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        newCode(){
            try {
                axios.get("http://localhost:47555/api/v1/FixedAssets/autoID")
                .then(response => {
                    this.asset.fixedAssetCode = response.data
                })
                .catch(e => {
                    console.log(e);
                }) 
            } catch (error) {
                console.log(error);
            }
            
        },

        /**
         * Format number cho giá, số lượng, tỉ lệ hao mòn,...
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        numberFormatInput(){
            try {
                this.asset.cost = numberFormat(this.asset.cost)
                this.asset.quantity = numberFormat(this.asset.quantity)
                this.asset.depreciationValue = numberFormat(this.asset.depreciationValue)
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tự động điền Tên bộ phận vào textbox Tên bộ phận khi chọn combobox Mã bộ phận
         * Lấy thông tin từ component combobox con
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getNameDepartment(name, id) {
            try {
                this.asset.departmentName = name;
                this.asset.departmentID = id;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tự động điền Tên loại tài sản vào textbox Tên bộ phận khi chọn combobox Mã tài sản
         * Lấy thông tin từ component combobox con
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getNameCategory(name, id) {
            try {
                this.asset.fixedAssetCategoryName = name
                this.asset.fixedAssetCategoryID = id
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
                //Đối với số lượng
                if(input=="quantity"){
                    this.asset.quantity++;
                }
                //Đối với tỉ lệ hao mòn
                else if(input == "depreciation_rate"){
                    this.asset.depreciationRate++;
                    this.updateDepreciationValue();
                }
                //Đối với số năm sử dụng
                else if(input == "life_time"){
                    this.asset.lifeTime++;
                    this.updateDepreciationRate();
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
                //Đối với input số lượng
                if(input=="quantity"){
                    if(this.asset.quantity>0){
                        this.asset.quantity--;
                    }
                    else{
                        this.asset.quantity=0;
                    }
                }
                //Đối với input tỉ lệ hao mòn
                else if(input == "depreciation_rate"){
                    if(this.asset.depreciationRate>0){
                        this.asset.depreciationRate--;
                        this.updateDepreciationValue();
                    }
                    else{
                        this.asset.depreciationRate=0;
                    }
                }
                //Đối với input số năm sử dụng
                else if(input == "life_time"){
                    if(this.asset.lifeTime>0){
                        this.asset.lifeTime--;
                        this.updateDepreciationRate();
                    }
                    else{
                        this.asset.lifeTime=0;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tính giá trị hao mòn khi thay đổi Tỉ lệ hao mòn hoặc Nguyên giá
         * Author: Nguyễn Thi Mỹ Linh - 14/08/2022
         */
        updateDepreciationValue(){
            try {
                let x = Math.floor((this.asset.cost).replace(/[^0-9]/g, '')) * (this.asset.depreciationRate / 100);
                this.asset.depreciationValue=numberFormat(x.toFixed());
                this.checkDepreciationRate();
                this.checkDepreaciationValue();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Kiểm tra tỷ lệ hao mòn
         * Author: Nguyễn Thị Mỹ Linh - 10/09/2022
         */
        checkDepreciationRate(){
            try {
                if(this.asset.depreciationRate > Math.round(((1/this.asset.lifeTime)*100)*100)/100){
                    this.$refs['txtDepreciationRate'].classList.add("border-red");
                    document.getElementById('txtDepreciationRate').classList.add("tooltip-input1");
                }else{
                    this.$refs['txtDepreciationRate'].classList.remove("border-red");
                    document.getElementById('txtDepreciationRate').classList.remove("tooltip-input1");   
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tính tỉ lệ hao mòn khi nhập Số năm sử dụng
         * Author: Nguyễn Thị Mỹ Linh - 10/09/2022
         */
        updateDepreciationRate(){
            try {
                this.asset.depreciationRate = Math.round(((1/this.asset.lifeTime)*100)*100)/100;
                this.updateDepreciationValue();
                this.checkDepreaciationValue();
            } catch (error) {
                console.log(error);
            }
        },
        
        /**
         * Kiểm tra giá trị hao mòn năm
         * Author: Nguyễn Thị Mỹ Linh - 10/09/2022
         */
        checkDepreaciationValue(){
            try {
                
                let maxValue = Math.floor((this.asset.cost).replace(/[^0-9]/g, '')) / this.asset.lifeTime;
                let value = Math.floor((this.asset.depreciationValue).replace(/[^0-9]/g, '')) * this.asset.lifeTime;
                let cost = Math.floor((this.asset.cost).replace(/[^0-9]/g, ''));
                
                this.depreciationValue = numberFormat(maxValue.toFixed());
                if(value > cost){
                    this.$refs['txtDepreciationValue'].classList.add("border-red");
                    document.getElementById('txtDepreciationValue').classList.add("tooltip-input1");
                }else{
                    this.$refs['txtDepreciationValue'].classList.remove("border-red");
                    document.getElementById('txtDepreciationValue').classList.remove("tooltip-input1");
                }
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
        //Đối với input nhập text
        checkInput(inputName,input){
            try {
                if (!input.value) {
                    input.classList.add("border-red");
                    document.getElementById(inputName).classList.add("tooltip-input");
                }
                else {
                    input.classList.remove("border-red");
                    document.getElementById(inputName).classList.remove("tooltip-input");
                    this.checkDepreciationRate();
                }
            } catch (error) {
                console.log(error);
            }
        },
        //Đối vớ input nhập số
        checkInputNumber(inputName,input){
            try {
                if (input.value < 0 || !input.value) {
                    input.classList.add("border-red");
                    document.getElementById(inputName).classList.add("tooltip-input");
                }
                else {
                    input.classList.remove("border-red");
                    document.getElementById(inputName).classList.remove("tooltip-input");
                    this.checkDepreciationRate();
                    this.checkDepreaciationValue();
                }
            } catch (error) {
                console.log(error);
            }
        },
        //Đối với combobox
        checkComboboxDepartment(input){
            try {
                //Khi combobox được click vào nhưng không chọn thì báo đỏ
                if(!this.nameDepartment){
                    input.classList.add("border-red");
                }
                //Khi combobox đã được chọn thì bỏ báo đỏ
                else{
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
        validateForm(){
            try {
                //Làm rỗng danh sách lỗi
                this.validateList=[];
                //Kiểm tra từng trường dữ liệu
                if(!this.asset.fixedAssetCode){
                    this.validateList.push("txtAssetCode");
                    this.$refs["txtAssetCode"].classList.add("border-red");
                    document.getElementById("txtAssetCode").classList.add("tooltip-input");
                }
                if(!this.asset.fixedAssetName){
                    this.validateList.push("txtAssetName");
                    this.$refs["txtAssetName"].classList.add("border-red");
                    document.getElementById("txtAssetName").classList.add("tooltip-input");
                }
                if(!this.asset.departmentID){
                    this.validateList.push("txtDepartmentID");
                    this.validateCombobox=true;
                }
                if(!this.asset.fixedAssetCategoryID){
                    this.validateList.push("txtFixedAssetCategoryID");
                    this.validateCombobox=true;
                }
                if(!this.asset.quantity){
                    this.validateList.push("txtQuantity");
                    this.$refs["txtQuantity"].classList.add("border-red");
                    document.getElementById("txtQuantity").classList.add("tooltip-input");
                }
                if(!this.asset.cost){
                    this.validateList.push("txtCost");
                    this.$refs["txtCost"].classList.add("border-red");
                    document.getElementById("txtCost").classList.add("tooltip-input");
                }
                if(!this.asset.depreciationRate){
                    this.validateList.push("txtDepreciationRate");
                    this.$refs["txtDepreciationRate"].classList.add("border-red");
                    document.getElementById("txtDepreciationRate").classList.add("tooltip-input");
                }
                if(!this.asset.depreciationValue){
                    this.validateList.push("txtDepreciationValue");
                    this.$refs["txtDepreciationValue"].classList.add("border-red");
                    document.getElementById("txtDepreciationValue").classList.add("tooltip-input");
                }
                if(!this.asset.lifeTime){
                    this.validateList.push("txtLifeTime");
                    this.$refs["txtLifeTime"].classList.add("border-red");
                    document.getElementById("txtLifeTime").classList.add("tooltip-input");
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Kiểm tra sự thay đổi form
         * Author: Nguyễn Thị Mỹ Linh 
         */
        checkChangeForm(){
            try {
                if(this.title=="edit"){
                    if(
                        this.asset.fixedAssetCode == this.assetSelected.fixedAssetCode &&
                        this.asset.fixedAssetName == this.assetSelected.fixedAssetName &&
                        this.asset.fixedAssetCategoryID == this.assetSelected.fixedAssetCategoryID &&
                        this.asset.departmentID == this.assetSelected.departmentID &&
                        this.asset.quantity == this.assetSelected.quantity &&
                        this.asset.cost == this.assetSelected.cost &&
                        this.asset.depreciationRate == this.assetSelected.depreciationRate &&
                        this.asset.depreciationValue == this.assetSelected.depreciationValue &&
                        this.asset.purchaseDate == this.assetSelected.purchaseDate &&
                        this.asset.productionDate == this.assetSelected.productionDate
                    ){
                        this.messageList=[];
                        this.messageList.push("Thông tin chưa chưa được thay đổi!");
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Thêm mới tài sản
         * Author: Nguyễn Thị Mỹ Linh - 27/08/2022
         */
        saveForm(){
            try {
                //Validate dữ liệu
                this.validateForm();
                //Kiểm tra nếu danh sách lỗi rỗng thì mới cho sửa hoặc thêm
                if(this.validateList.length==0){
                    //Sửa
                    if(this.title == "edit"){
                        //Chuẩn bị dữ liệu đầu vào
                        const dataEdit = {
                            fixedAssetId: this.asset.fixedAssetId,
                            fixedAssetCode: this.asset.fixedAssetCode,
                            fixedAssetName: this.asset.fixedAssetName,
                            departmentID: this.asset.departmentID,
                            fixedAssetCategoryID: this.asset.fixedAssetCategoryID,
                            purchaseDate: this.asset.purchaseDate,
                            cost: formatNumber(this.asset.cost) || this.asset.cost,
                            quantity: formatNumber(this.asset.quantity) || this.asset.quantity,
                            depreciationRate: this.asset.depreciationRate,
                            trackedYear: this.asset.trackedYear,
                            lifeTime: this.asset.lifeTime,
                            createdBy: this.asset.createdBy,
                            createdDate: this.asset.createdDate,
                            modifiedBy: this.asset.modifiedBy,
                            modifiedDate: new Date(),
                            productionDate: this.asset.productionDate,
                            depreciationValue: formatNumber(this.asset.depreciationValue) || this.asset.depreciationRate
                        }
                        //Gọi API sửa
                        axios.put("http://localhost:47555/api/v1/FixedAssets", dataEdit)
                            .then(res => {
                                //Nếu thành công thì load lại dữ liệu
                                this.filterData();
                                //Đóng form
                                this.dialogFunction(false);
                                //Hiển thị toast message
                                this.toastMessageFucntion("Sửa");
                                //Gửi ID của bản ghi vừa thao tác cho component cha để checked bản ghi
                                this.$emit("getIdAsset", res.data);
                            })
                            .catch((error)=>{
                                //Check trùng mã
                                if(error.response.data.errorCode == 3){
                                    //Hiển thị thông báo trùng mã
                                    this.messageList=[]
                                    this.messageList.push("Mã tài sản đã tồn tại, vui lòng nhập mã khác!");
                                    this.titleMessage="confirm";
                                    this.isShowNotice=true;
                                    //Reset lại mã cũ
                                    this.newCode();
                                }
                            })
                    }
                    // Thêm
                    else if (this.title=="add" || this.title=="copy"){
                        //Chuẩn bị dữ liệu đầu vào
                        const dataAdd = {
                            fixedAssetId: uuid.v1(),
                            fixedAssetCode: this.asset.fixedAssetCode,
                            fixedAssetName: this.asset.fixedAssetName,
                            departmentID: this.asset.departmentID,
                            fixedAssetCategoryID: this.asset.fixedAssetCategoryID,
                            purchaseDate: this.asset.purchaseDate,
                            cost: formatNumber(this.asset.cost)||this.asset.cost,
                            quantity: formatNumber(this.asset.quantity)||this.asset.quantity,
                            depreciationRate: this.asset.depreciationRate,
                            trackedYear: this.asset.trackedYear,
                            lifeTime: this.asset.lifeTime,
                            createdBy: "Admin",
                            createdDate: new Date(),
                            modifiedBy: "Admin",
                            modifiedDate: new Date(),
                            productionDate: this.asset.productionDate,
                            depreciationValue: formatNumber(this.asset.depreciationValue)||this.asset.depreciationValue
                        }
                        //Gọi API thêm
                        axios.post("http://localhost:47555/api/v1/FixedAssets", dataAdd)
                            .then(res => {
                                //Load lại dữ liệu
                                this.filterData();
                                //Đóng dialog thêm
                                this.dialogFunction(false);
                                //Hiển thị toast message
                                if(this.title == "add"){
                                   this.toastMessageFucntion("Thêm") 
                                }
                                else if(this.title == "copy"){
                                    this.toastMessageFucntion("Nhân bản")
                                }
                                //Gửi ID của bản ghi vùa thêm lên component cha để checked bản ghi
                                this.$emit("getIdAsset", res.data);
                            })
                            .catch((error)=>{
                                //Check trùng mã
                                if(error.response.data.errorCode == 3){
                                    //Hiển thị lỗi
                                    this.messageList=[]
                                    this.messageList.push("Mã tài sản đã tồn tại, vui lòng nhập mã khác!");
                                    this.titleMessage="confirm";
                                    this.isShowNotice=true;
                                    //Tạo lại mã gợi ý mới
                                    this.newCode();
                                }
                            })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Khi người dùng chọn hủy
         * Author: Nguyễn Thị Mỹ Linh -18/08/2022
         */
        cancelForm(){
            try {
                this.messageList=[]
                if(this.title=="add" || this.title=="copy"){
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
                this.filterData()
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