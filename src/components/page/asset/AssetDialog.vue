<template>
    <div class="pop-up pop-up-info" id="pop-up-asset">
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
                                <div class="form-input">
                                    <input type="text" class="input" 
                                        id="txtAssetCode" 
                                        name="Mã tài sản" 
                                        v-model="asset.fixedAssetCode" 
                                        tabindex="1" 
                                        ref="txtAssetCode"
                                        @blur="checkInput('assetCode',this.$refs['txtAssetCode'])" 
                                        maxlength="20"
                                        required
                                    >
                                    <div id="assetCode" class="tooltip" style="color:red; margin-top:-70px">Mã tài sản không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item form-item-two">
                                <div class="form-lable">Tên tài sản <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <input type="text" class="input" 
                                        id="txtAssetName" 
                                        name="Tên tài sản" 
                                        v-model="asset.fixedAssetName" 
                                        placeholder="Nhập tên tài sản" 
                                        tabindex="2"
                                        ref="txtAssetName" 
                                        @blur="checkInput('assetName',this.$refs['txtAssetName'])" 
                                        maxlength="225"
                                        required
                                    >
                                    <div id="assetName" class="tooltip" style="color:red; margin-top:-70px">Tên tài sản không được bỏ trống</div>
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
                                <div class="form-input">
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
                                        @blur="checkInputNumber('quantity',this.$refs['txtQuantity'])"
                                    >
                                    <div id="quantity" class="tooltip" style="color:red; margin-top:-70px">Số lượng không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Nguyên giá <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <input type="text" 
                                        class="input input-number" 
                                        v-model="asset.cost" 
                                        tabindex="6" 
                                        @change="updateRate()"
                                        @input="numberFormatInput()" 
                                        ref="txtCost" 
                                        @blur="checkInputNumber('cost',this.$refs['txtCost'])"
                                    >
                                    <div id="cost" class="tooltip" style="color:red ; margin-top:-70px">Nguyên giá không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Số năm sử dụng <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('life_time')"></div>
                                        <div class="icon icon-down" @click="downNumber('life_time')"></div>
                                    </div>
                                    <input type="number" 
                                        class="input input-number-icon" 
                                        v-model="asset.lifeTime" 
                                        tabindex="7"
                                        @change="updateRate()"
                                        ref="txtLifeTime" 
                                        @blur="checkInputNumber('lifeTime',this.$refs['txtLifeTime'])"
                                    >
                                    <div id="lifeTime" class="tooltip" style="color:red; margin-top:-70px">Số năm sử dụng không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Tỉ lệ hao mòn (%) <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <div class="combo-icon">
                                        <div class="icon icon-up" @click="upNumber('depreciation_rate')"></div>
                                        <div class="icon icon-down" @click="downNumber('depreciation_rate')"></div>
                                    </div>
                                    <input type="number" 
                                        class="input input-number-icon" 
                                        v-model="asset.depreciationRate" 
                                        tabindex="8" 
                                        @change="updateRate()" 
                                        @input="numberFormatInput()" 
                                        ref="txtDepreciationRate"
                                        @blur="checkInputNumber('depreciationRate',this.$refs['txtDepreciationRate'])"
                                    > 
                                    <div id="depreciationRate" class="tooltip" style="color:red; margin-top:-70px">Tỉ lệ hao mòn không được bỏ trống</div>
                                </div>
                            </div>
                            <div class="form-item">
                                <div class="form-lable">Giá trị hao mòn năm <span style="color:red">*</span></div>
                                <div class="form-input">
                                    <input type="text" 
                                        class="input input-number" 
                                        v-model="asset.depreciationValue" 
                                        tabindex="9"
                                        @input="numberFormatInput()"
                                        ref="txtDepreciationValue" 
                                        @blur="checkInputNumber('depreciationValue',this.$refs['txtDepreciationValue'])"
                                    >
                                    <div id="depreciationValue" class="tooltip" style="color:red; margin-top:-70px">Giá trị hao mòn năm không được bỏ trống</div>
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
            message:"",
            titleMessage:"",
            typeCombobox:"comboboxForm",
            showTooltip:false,
        }
        
    },

    created(){
        this.titleMessage=this.title;
        if(this.title=="edit" || this.title=="copy"){
            this.asset=this.assetSelected;
        }
        this.numberFormatInput();
        this.updateRate();
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
            axios.get("http://localhost:47555/api/v1/FixedAssets/new-code")
            .then(response => {
                this.asset.fixedAssetCode = response.data
            })
            .catch(e => {
                console.log(e);
            })
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
                    this.updateRate();
                }
                //Đối với số năm sử dụng
                else if(input == "life_time"){
                    this.asset.lifeTime++;
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
                    this.updateRate();
                    }
                    else{
                        this.asset.depreciationRate=0;
                    }
                }
                //Đối với input số năm sử dụng
                else if(input == "life_time"){
                    if(this.asset.lifeTime>0){
                        this.asset.lifeTime--;
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
        updateRate(){
            try {
                this.asset.depreciationValue = numberFormat((this.asset.cost).replace(/[^0-9]/g, '') * (this.asset.depreciationRate / 100));
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
                    this.showTooltip=true;
                }
                else {
                    input.classList.remove("border-red");
                    document.getElementById(inputName).classList.remove("tooltip-input");
                    this.showTooltip=false;
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
                this.messageList=[];
                //Kiểm tra nếu có bất kì input bắt buộc nào còn trống thì hiện lỗi
                if(!this.asset.fixedAssetCode || !this.asset.fixedAssetName || !this.asset.departmentID ||
                   !this.asset.fixedAssetCategoryID || !this.asset.quantity || !this.asset.cost || !this.asset.depreciationRate || 
                   !this.asset.purchaseDate || !this.asset.productionDate || !this.asset.lifeTime || !this.asset.depreciationValue){
                    this.messageList=[];
                    this.messageList.push("Thông tin chưa đầy đủ. Vui lòng nhập đầu đủ thông tin!");
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
            debugger;
            try {
                //Validate dữ liệu
                this.validateForm();
                //Kiểm tra nếu danh sách lỗi rỗng thì mới cho sửa hoặc thêm
                if(this.messageList.length==0){
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
                                this.toastMessageFucntion("Thêm")
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
                //Nếu danh sách lỗi có thì hiển thị thông báo lỗi
                else{
                    this.titleMessage="confirm";
                    this.isShowNotice=true;
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