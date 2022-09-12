<template>
    <div class="content-top">
        <div class="content-top-left">
            <div class="search-input">
                <div class="icon icon-search-input"></div>
                <input style="text-transform: capitalize;" type="text" class="input input-search" ref="txtSearch" v-model="filterInfo.keyWord" placeholder="Tìm kiếm tài sản" @change="searchData(filterInfo.keyWord)">
            </div>
            <div class="search-filter">
                <div class="icon icon-search-filter"></div>
                <msCombobox class="combobox-search-filter"
                    :url="'http://localhost:47555/api/v1/FixedAssetCategorys'"
                    :propValue="'FixedAssetCategoryID'"
                    :propText="'FixedAssetCategoryName'"
                    :placeholder="'Loại tài sản'"
                    :propCode="'FixedAssetCategoryName'"
                    @getID="getCategoryID"
                ></msCombobox>
            </div>
            <div class="search-filter">
                <div class="icon icon-search-filter"></div>
                <msCombobox class="combobox-search-filter"
                    :url="'http://localhost:47555/api/v1/Departments'"
                    :propValue="'DepartmentID'"
                    :propText="'DepartmentName'"
                    :placeholder="'Bộ phận sử dụng'"
                    :propCode="'DepartmentName'"
                    @getID="getDepartmentID"
                ></msCombobox>
            </div>
        </div>
        <div class="content-seach-right">
            <button class="button button-add button-main" @click="openOrCloseDialog(true,'add')">
                <div class="icon icon-button-add"></div>
                Thêm tài sản
            </button>
            <div class="content-right-icon">
                <div class="button-icon">
                    <div class="icon icon-excel"></div>
                </div>
                <span class="tooltip">Excel</span>
            </div>
            <div class="content-right-icon">
                <div class="button-icon" @click="deleteData()">
                    <div class="icon icon-delete"></div>
                </div>
                <span class="tooltip">Xóa</span>
            </div>
            
        </div>
    </div>
    <div class="content-table">
        <table>
            <thead>
                <tr class="table-head">
                    <th class="td_checkbox"><input type="checkbox" class="table_checkbox" name="" v-model="checkAll" @click="checkAllRows()"></th>
                    <th class="th_tooltip">
                        <div> STT </div>
                        <span class="tooltip">Số thứ tự</span>
                        </th>
                    <th>Mã tài sản</th>
                    <th>Tên tài sản</th>
                    <th>Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th class="text-center">Ngày mua</th>
                    <th class="float-right">Số lượng</th>
                    <th class="float-right" style="width:150px">Nguyên giá</th> 
                    <th class="float-right th_tooltip" style="width:100px">HM/KH lũy kế <span class="tooltip">Hao mòn/Khấu hao lũy kế</span></th>
                    <th class="float-right" style="width:150px">Giá trị còn lại</th>
                    <th class="text-center" style="width:100px">Chức năng</th>
                </tr>
            </thead>
            <tfoot>
                <div class="border-top"></div>
                <tr class="table-head">
                    <th></th>
                    <th><p></p></th>
                    <th><p></p></th>
                    <th><p></p></th>
                    <th><p></p></th>
                    <th><p></p></th>
                    <th><p></p></th>
                    <th class="float-right">{{numberFormat(totalQuantity)|| ""}}</th>
                    <th class="float-right">{{numberFormat(totalCost)|| ""}}</th>
                    <th class="float-right">{{numberFormat(totalDepreciation) || ""}}</th>
                    <th class="float-right">{{numberFormat(totalRealCost) || ""}}</th>
                    <th></th>
                </tr>
               
            </tfoot>
            <tbody>
                <tr class="row-data" 
                    v-for="(asset,index) in assets" :key="asset.fixedAssetId" 
                    @dblclick="openOrCloseDialog(true,'edit', index)" 
                    @click="activeRow(asset, $event, index)" 
                    :class="{ 'bg-row': checkRow(asset.fixedAssetId) }"
                >
                    <td class="td_checkbox">
                        <input type="checkbox" class="table_checkbox" name="" v-model="checkedList"
                            :value="asset.fixedAssetId" @click="activeRow(asset)"
                            >
                    </td>
                    <td class="text-center">{{index+1}}</td>
                    <td>{{asset.fixedAssetCode || ""}}</td>
                    <td><p style="width:220px">{{asset.fixedAssetName || ""}}</p></td>
                    <td><p style="width:180px">{{asset.fixedAssetCategoryName || ""}}</p></td>
                    <td><p style="width:180px">{{asset.departmentName || ""}}</p></td>
                    <td class="text-center">
                        {{formatDate(asset.purchaseDate) || ""}}
                    </td>
                    <td class="float-right">
                        {{numberFormat(asset.quantity) || ""}}
                    </td>
                    <td class="float-right">
                        {{ numberFormat(asset.cost) || ""}}
                    </td>
                    <td class="float-right">
                        {{numberFormat((asset.cost*(asset.depreciationRate/100)*asset.lifeTime).toFixed()) || ""}}
                    </td>
                    <td class="float-right">
                        {{numberFormat(asset.cost - (asset.cost*(asset.depreciationRate/100)*asset.lifeTime)) || ""}}
                    </td>
                    <td>
                        <div class="table-function-icon">
                            <div class="function-item" @click="openOrCloseDialog(true,'edit', index)">
                                <div class="item-icon">
                                    <div class="icon-small icon-edit"></div>
                                    <span class="tooltip">Sửa</span>
                                </div>
                            </div>
                            <div class="function-item" @click="openOrCloseDialog(true,'copy', index)">
                                <div class="item-icon">
                                    <div class="icon-small icon-copy"></div>
                                    <span id="a" class="tooltip">Nhân bản</span>
                                </div>
                            </div>
                            <div class="function-item" @click="deleteOne(asset.fixedAssetId, asset.fixedAssetCode, asset.fixedAssetName)">
                                <div class="item-icon">
                                    <i class="icon-small icon-delete-small"></i>
                                    <span id="a" class="tooltip">Xóa</span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td v-if="this.assets.length <=0" colspan="12" class="table-nodata">
                    </td>
                    
                </tr>
            </tbody>
        </table>
    </div>
    <div class="pagination">
        <div class="pagination-left">
            Tổng số: <strong>{{totalRecord}}</strong> bản ghi
        </div>
        <div class="pagination-center">
            <select name="combobox" id="cbx-quantity" class="combobox combobox-pagination" @change="chooseQuantityRecords($event.target.value)">
                <option value="20">20 </option>
                <option value="50">50 </option>
                <option value="100">100 </option>
            </select>
        </div>
        <div class="pagination-right">
            <div class="pagination-item" @click="chooseFirstPage()">
                <i class="fa-solid fa-angles-left"></i>
                <span class="tooltip">Trang đầu</span>
            </div>
            <div class="pagination-item" @click="choosePreviousPage()">
                <div class="icon icon-pagination-prev"></div>
                <span class="tooltip">Trang trước</span>
            </div>
            <div :class="{ paginationActive: page.isDisabled }" @click="choosePage(page.name)" class="btn-pagination pagination-number"  v-for="page in pages" :key="page.name">{{ page.name }}</div>
            <div class="pagination-item" @click="chooseNextPage()">
                <div class="icon icon-pagination-next"></div>
                <span class="tooltip">Trang sau</span>
            </div>
            <div class="pagination-item" @click="chooseLastPage()">
                <i class="fa-solid fa-angles-right"></i>
                <span class="tooltip">Trang cuối</span>
            </div>
        </div>
    </div>

    <div class="loading" v-if="isLoad">
        <div class="loading-icon"></div>
        <div class="loading-text">Đang xử lý</div>
    </div>

    <AssetDetail
        v-if="isShowDialog"
        :isShowDialog="isShowDialog"
        :isShowDialogFunction="closeDialog"
        :assetSelected="asset"
        :title="title"
        :dialogFunction="openOrCloseDialog"
        :filterData="filterData"
        :toastMessageFucntion="showToastMessage"
        @getIdAsset="selectedAsset"
    />

    <assetNotice
        v-if="isShowNotice"
        :listError="messageList"
        :isShowFuction="closeNotice"
        :title="title"
        :checkList="checkedList"
        :filterData="filterData"
        :deleteInfo="deleteInfo"
        :toastMessageFucntion="showToastMessage"
    >
    </assetNotice>

    <div id="toastMessage" :class="{ show: isShowMessage }">
        <i class="fa-solid fa-circle-check icon-toast fa-2xl" style="color:#33CC66"></i>
        <div style="margin-left:16px"> {{ toastMessageName }} dữ liệu thành công</div>
    </div>
    
</template>

<script>
import axios from 'axios'
import assetNotice from './AssetNotice.vue'
import AssetDetail from './AssetDialog.vue';
import {numberFormat, formatDate} from '../../../assets/js/common';

export default {
    name:"AssetPage",
    components:{
        AssetDetail,
        assetNotice
    },
    data() {
        return {
            isShowDialog : false,
            isShowNotice : false,
            isShowMessage: false,
            toastMessageName:"",
            date:new Date(), 
            assets:[],
            asset:{},
            title:"",
            assetSelected:{},
            isLoad:true,
            checkAll:false,
            checkedList:[],
            messageList:[],
            deleteInfo:{id:"",code:"", name:""},
            firstItem:0,
            lastItem:0,
            totalCost:0,
            totalRealCost:0,
            totalQuantity:0,
            totalDepreciation:0,
            totalRecord:0,
            filterInfo:{ pageNumber:1, pageSize:20, keyWord:"", departmentID:"", fixedAssetCategoryID:"" },
            pagingInfo:{totalPage:0, quantityButtonNumberPaging:5}
        }
    },
    created(){
        // Gọi api lấy data
        this.filterData(this.filterInfo.pageNumber, this.filterInfo.pageSize);
    },
    mounted(){
        //Mặc định focus con trỏ tại vị trí search khi vào trang
        this.$refs.txtSearch.focus();
    },
    methods:{
        /**
         * Form number, date, ... 
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        numberFormat, formatDate,

        /**
         * Chọn trang đầu tiên
         * Author: Nguyễn Thị Mỹ Linh -05/09/2022
         */
        chooseFirstPage() {
            this.filterInfo.pageNumber = 1;
            this.filterData();
        },

        /**
         * Chọng trang trước
         * Author:Nguyễn Thị Mỹ Linh - 05/09/2022
         */
        choosePreviousPage() {
            if(this.filterInfo.pageNumber > 1) {
                this.filterInfo.pageNumber -= 1;
                this.filterData();
            }
        },

        /**
         * Chọn trang theo số
         * Author: Nguyễn Thị Mỹ Linh - 05/09/2022
         */
        choosePage(page) {
            this.filterInfo.pageNumber = page;
            this.filterData();
        },

        /**
         * Chọn trang tiếp theo
         * Author: Nguyễn Thị Mỹ Linh - 05/09/2022
         */
        chooseNextPage() {
            if(this.filterInfo.pageNumber < this.pagingInfo.totalPage) {
                this.filterInfo.pageNumber += 1;
                this.filterData();
            }
        },

        /**
         * Chọn trang cuối cùng
         * Author: Nguyễn Thị Mỹ Linh - 05/09/2022
         */
        chooseLastPage() {
            this.filterInfo.pageNumber = this.pagingInfo.totalPage;
            this.filterData();
        },

        /**
         * Lấy ID department để lọc
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getDepartmentID(id){
            try {
                this.filterInfo.departmentID=id;
                this.filterInfo.pageNumber=1;
                this.filterData();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Lấy ID category để lọc
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        getCategoryID(id){
            try {
                this.filterInfo.fixedAssetCategoryID=id;
                this.filterInfo.pageNumber=1;
                this.filterData();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Chọn số lượng bản ghi trên trang
         * Author: Nguyễn Thị Mỹ Linh - 30/08/2022
         */
        chooseQuantityRecords(pageSize){
            try {
                this.filterInfo.pageSize=pageSize;
                this.filterData();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Lọc dữ liệu
         * Author: Nguyễn Thị Mỹ Linh - 25/08/2022
         */
        filterData(){
            try {
                this.totalCost=0,
                this.totalRealCost=0,
                this.totalQuantity=0,
                this.totalDepreciation=0,
                // Gọi api lấy data
                axios.get(`http://localhost:47555/api/v1/FixedAssets/filter?keyword=${this.filterInfo.keyWord}&departmentID=${this.filterInfo.departmentID}&fixedAssetCategoryID=${this.filterInfo.fixedAssetCategoryID}&pageSize=${this.filterInfo.pageSize}&pageNumber=${this.filterInfo.pageNumber}`)
                    .then(response => {
                        this.assets = response.data.data
                        this.totalRecord = response.data.totalCount
                        this.pagingInfo.totalPage = Math.ceil(this.totalRecord / this.filterInfo.pageSize);
                        //tính các tổng trong bảng
                        let data = this.assets;
                        for(let i=0;i<data.length;i++){
                            //tổng số lượng
                            this.totalQuantity+=data[i].quantity;
                            //tổng nguyên giá
                            this.totalCost+=data[i].cost;
                            //tổng hao mòn/khấu hao lũy kế
                            this.totalDepreciation+=data[i].cost*(data[i].depreciationRate/100)*data[i].lifeTime;
                            //tổng giá trị còn lại
                            this.totalRealCost=(this.totalCost-this.totalDepreciation);
                        }
                        //Tải dữ liệu thành công tắt loading
                        setTimeout(() => this.isLoad = false, 500);
                    })
                    .catch(e => {
                        console.log(e);
                    }
                )
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Search dữ liệu
         * Author: Nguyễn Thị Mỹ Linh - 29/08/2022
         */
        searchData(keyword){
            try {
                this.filterInfo.keyWord=keyword;
                this.filterInfo.pageNumber=1;
                this.filterData();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Mở / Đóng form tài sản
         * Author: Nguyễn Thị Mỹ Linh - 1/8/2022
         */
        openOrCloseDialog(isShow, title, i){
            try {
                this.isShowDialog = isShow;
                this.title=title;
                if(i || i==0){
                    this.asset=this.assets[i];
                    this.checkedList=[];
                    this.checkedList.push(this.asset.fixedAssetId);
                }else{
                    this.asset={
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
                        productionDate:new Date()
                    };
                }
                this.filterData();
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Kiểu tra xem bản ghi có trong list bản ghi được chọn hay không.
         * Author: Nguyễn Thị Mỹ Linh - 1/8/2022
         */
        checkRow(rowActive){
            try {
                for(let item of this.checkedList) {
                if(rowActive == item){
                    return rowActive;
                }
            }
            } catch (error) {
                console.log(error);
            }
        },

        checkedInput(id){
            try {
                if(this.checkRow(id)){
                    var i = this.checkedList.indexOf(id);
                    this.checkedList.splice(i,1); 
                }else{
                    this.checkedList.push(id);
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Đánh dấu bản ghi được chọn
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        activeRow(asset, e, index){
            try {
                //1. Trường hợp người dùng ấn giữ phím Ctrl
                if (e.ctrlKey) {
                    //Nếu bản ghi đang checked
                    if(this.checkRow(asset.fixedAssetId)){
                        let i = this.checkedList.indexOf(asset.fixedAssetId);
                        this.checkedList.splice(i,1); 
                        // this.checkedList = [];
                        // this.deleteList=[]
                        this.checkRows();
                    }
                    else{
                        //1.1 Thêm bản ghi vào list bản ghi được chọn
                        this.checkedList.push(asset.fixedAssetId);
                        //1.2 Kiểm tra nếu người dùng chọn tất cả bản ghi thì tự động checked checkbox cha
                        this.checkRows();
                    }
                } 
                //2. Trường hợp người dùng ấn giữ phím Shift để chọn nhiều bản ghi
                else if(e.shiftKey){    
                    if(this.checkRow(asset.fixedAssetId)){
                        let i = this.checkedList.indexOf(asset.fixedAssetId);
                        this.checkedList.splice(i,1); 
                        // this.checkedList = [];
                        // this.deleteList=[]
                        this.checkRows();
                    }else {
                        //2.1 Lấy vị trí bản ghi mà người dùng muốn lấy 
                        this.lastItem = index;
                        //2.2 làm rỗng danh sách chứa bản ghi được chọn
                        this.checkedList = [];
                        //2.3 Lấy danh sách các bản ghi từ vị trí bản ghi đầu tiên đến bản ghi cuối cùng mà người dùng chọn
                        //2.3.1 Nếu người dùng chọn từ trên xuống dưới
                        if(this.firstItem<this.lastItem){
                            for(let i = this.firstItem; i <= this.lastItem; i++){
                                this.checkedList.push(this.assets[i].fixedAssetId);
                            }
                        }
                        //2.3.3 Nếu người dùng chọn từ dưới lên trên
                        if(this.firstItem > this.lastItem){
                            for(let i = this.firstItem; this.lastItem <= i ; i--){
                                this.checkedList.push(this.assets[i].fixedAssetId);
                            }
                        }
                        //2.4 Kiểm tra nếu người dùng chọn tất cả bản ghi thì tự động checked checkbox cha
                        this.checkRows();
                    }
                    
                }
                //3. Trường hợp người dùng không ấn giữ phím nào
                else {
                    if(this.checkRow(asset.fixedAssetId) && this.checkedList.length==1){
                        let i = this.checkedList.indexOf(asset.fixedAssetId);
                        this.checkedList.splice(i,1); 
                        // this.checkedList = [];
                        // this.deleteList=[]
                    }else{
                        //3.1 Nếu người dùng không giữ phím Ctrl thì khi chọn 1 bản ghi tự động làm rỗng list bản ghi được chọn
                        this.checkedList = [];
                        this.deleteList=[]
                        //3.2 Lấy vị trí ;bản ghi được chọn
                        this.firstItem=index;
                        //3.3 Thêm bản ghi vào list bản ghi được chọn
                        this.checkedList.push(asset.fixedAssetId);
                        this.deleteList.push(asset);
                        //3.4 Xóa trạng thái checked của checkbox cha
                        this.checkAll = false;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Checked checkbox cha thì tự động checked tất cả checkbox con
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        checkAllRows(){
            try {
                this.checkedList = [];
                if (!this.checkAll) {
                    for (let i in this.assets) {
                        this.checkedList.push(this.assets[i].fixedAssetId);
                    }
                }
            } catch (error) {
                console.log();
            }
        },

        /**
         * Checked tất cả checkbox con thì tự động checked checkbox cha và ngược lại 
         */
        checkRows(){
            try {
                if(this.checkedList.length == this.assets.length){
                    this.checkAll=true;
                }
                else{
                    this.checkAll=false;
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xóa bản ghi
         * Author: Nguyễn Thị Mỹ Linh - 16/08/2022
         */
        deleteData(){
            try {
                if(this.checkedList.length==0){
                    this.messageList=[];
                    this.messageList.push("Chưa có bản ghi nào được chọn")
                    this.title="confirm";
                }else if(this.checkedList.length>1){
                    this.messageList=[];
                    this.title="delete";       
                }
                else if(this.checkedList.length==1){
                    this.messageList=[];
                    this.title="deleteOne";
                }
                this.isShowNotice=true;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Xóa 1 bản ghi
         * Author: LinhNTM(26/08/2022)
         */
        deleteOne(id,code, name){
            try {
                this.messageList=[];
                this.deleteInfo.id=id;
                this.deleteInfo.code=code;
                this.deleteInfo.name=name;
                this.title="deleteOne";
                this.isShowNotice=true;
                this.assetID = id;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Đóng thông báo
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        closeNotice(isShowNotice){
            try {
                this.isShowNotice=isShowNotice;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Đóng Dialog
         * Author: Nguyễn Thị Mỹ Linh
         */
        closeDialog(isShowDialog){
            try {
                this.isShowDialog=isShowDialog;
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Hiển thị toast message thông báo
         * Author: Nguyễn Thị Mỹ Linh 4/09/2022
         */
        showToastMessage(name) {
            this.toastMessageName = name;
            this.isShowMessage = true;
            setTimeout(() => this.isShowMessage = false, 3000);
        },

        /**
         * Checked tài sản vừa được thêm hoặc sửa
         */
        selectedAsset(id){
            this.checkedList=[];
            this.checkedList.push(id);
            this.checkRow(id);
        }
    },
    computed: {
        startPage() {
            if (this.filterInfo.pageNumber === 1) {
                return 1;
            }
            if (this.filterInfo.pageNumber === this.pagingInfo.totalPage) {
                return this.pagingInfo.totalPage;
            }
            return this.filterInfo.pageNumber - 1;
        },
        pages() {
        const range = [];
        for (let i = this.startPage; i <= Math.min(this.startPage + this.pagingInfo.quantityButtonNumberPaging - 1, this.pagingInfo.totalPage); i+= 1 ) {
            range.push({
                name: i,
                isDisabled: i === this.filterInfo.pageNumber
            });
        }
        return range;
        },
    },
}
</script>

<style scoped>
@import url("../../../assets/css/styles.css");
</style>