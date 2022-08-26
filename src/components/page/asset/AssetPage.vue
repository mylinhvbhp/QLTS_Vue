<template>
    <div class="content-top">
        <div class="content-top-left">
            <div class="search-input">
                <div class="icon icon-search-input"></div>
                <input type="text" class="input input-search" ref="txtSearch" placeholder="Tìm kiếm tài sản">
            </div>
            <div class="search-filter">
                <div class="icon icon-search-filter"></div>
                <msCombobox class="combobox-search-filter"
                    :url="'http://localhost:47555/api/v1/FixedAssetCategorys'"
                    :propValue="'FixedAssetCategoryID'"
                    :propText="'FixedAssetCategoryName'"
                    :placeholder="'Loại tài sản'"
                ></msCombobox>
            </div>
            <div class="search-filter">
                <div class="icon icon-search-filter"></div>
                <msCombobox class="combobox-search-filter"
                    :url="'http://localhost:47555/api/v1/Departments'"
                    :propValue="'DepartmentID'"
                    :propText="'DepartmentName'"
                    :placeholder="'Bộ phận sử dụng'"
                ></msCombobox>
            </div>
        </div>
        <div class="content-seach-right">
            <button class="button button-add" @click="openOrCloseDialog(true,'add')">
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
                    <th >Tên tài sản</th>
                    <th style="width:200px">Loại tài sản</th>
                    <th>Bộ phận sử dụng</th>
                    <th class="text-center">Ngày mua</th>
                    <th class="float-right">Số lượng</th>
                    <th class="float-right">Nguyên giá</th> 
                    <th class="float-right th_tooltip">HM/KH lũy kế <span class="tooltip">Hao mòn/Khấu hao lũy kế</span></th>
                    <th class="float-right">Giá trị còn lại</th>
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
                    <th class="float-right">{{numberFormat(totalQuantity)}}</th>
                    <th class="float-right">{{numberFormat(totalCost)}}</th>
                    <th class="float-right">{{numberFormat(totalDepreciation)}}</th>
                    <th class="float-right">{{numberFormat(totalRealCost)}}</th>
                    <th></th>
                </tr>
            </tfoot>
            <tbody>
                <tr class="row-data" 
                    v-for="(asset,index) in assets" :key="asset.fixedAssetCode" 
                    @dblclick="openOrCloseDialog(true,'edit', index)" 
                    @click="activeRow(asset, $event, index)" 
                    :class="{ 'bg-row': checkRow(asset.fixedAssetCode) }"
                >
                    <td class="td_checkbox">
                        <input type="checkbox" class="table_checkbox" name="" v-model="checkedList"
                            :value="asset.fixedAssetCode"
                            :class="checkRow(asset.fixedAssetCode)">
                    </td>
                    <td class="text-center">{{index+1}}</td>
                    <td>{{asset.fixedAssetCode}}</td>
                    <td>{{asset.fixedAssetName}}</td>
                    <td><p>{{asset.fixedAssetCategoryName}}</p></td>
                    <td>{{asset.departmentName}}</td>
                    <td class="text-center">
                        {{formatDate(asset.purchaseDate)}}
                    </td>
                    <td class="float-right">
                        {{numberFormat(asset.quantity)}}
                    </td>
                    <td class="float-right">
                        <!-- {{Intl.NumberFormat("vi-VN", {style: "currency",currency: "VND",}).format(asset.cost)}} -->
                        {{ numberFormat(asset.cost) }}
                    </td>
                    <td class="float-right">
                        {{numberFormat(asset.cost*(asset.depreciationRate/100)*asset.lifeTime)}}
                    </td>
                    <td class="float-right">
                        {{numberFormat(asset.cost - (asset.cost*(asset.depreciationRate/100)*asset.lifeTime))}}
                    </td>
                    <td>
                        <div class="table-function-icon">
                            <div class="function-item" @click="openOrCloseDialog(true,'edit', index)">
                                <div class="item-icon">
                                    <div class="icon icon-edit"></div>
                                    <span class="tooltip">Sửa</span>
                                </div>
                            </div>
                            <div class="function-item">
                                <div class="item-icon">
                                    <div class="icon icon-copy"></div>
                                    <span id="a" class="tooltip">Sao chép</span>
                                </div>
                            </div>
                            <div class="function-item">
                                <div class="item-icon">
                                    <i class="icon icon-delete-small"></i>
                                    <span id="a" class="tooltip">Xóa</span>
                                </div>
                            </div>
                        </div>
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
            <select name="combobox" id="cbx-quantity" class="combobox combobox-pagination" @change="chooseRecord($event.target.value)">
                <option value="10">10 </option>
                <option value="20">20 </option>
            </select>
        </div>
        <div class="pagination-right">
            <div class="icon icon-pagination-first"></div>
            <div class="btn-pagination pagination-number pagination-active">1</div>
            <div class="btn-pagination pagination-number">2</div>
            <div style="margin:0px 7px">...</div>
            <div class="btn-pagination pagination-number">10</div>
            <div class="icon icon-pagination-last"></div>
        </div>
    </div>

    <div class="loading" v-if="isLoad">
        <div class="loading-icon"></div>
        <div class="loading-text">Đang xử lý</div>
    </div>

    <AssetDetail
        v-if="isShowDialog"
        :isShowDialog="isShowDialog"
        :assetSelected="asset"
        :title="title"
        :dialogFunction="openOrCloseDialog"
    />

    <assetNotice
     v-if="isShowNotice"
     :listError="messageList"
     :isShowFuction="closeNotice"
     :title="title"
    >
    </assetNotice>
    
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
            date:new Date(), 
            assets:[],
            asset:{},
            title:"",
            assetSelected:{},
            isLoad:true,
            checkAll:false,
            checkedList:[],
            messageList:[],
            firstItem:0,
            lastItem:0,
            totalCost:0,
            totalRealCost:0,
            totalQuantity:0,
            totalDepreciation:0,
            totalRecord:0,
            filterInfo:{ pageNumber:1, pageSize:10, keyWord:"", departmentID:"", fixedAssetCategoryID:"" }
        }
    },
    created(){
        // Gọi api lấy data
        axios.get("http://localhost:47555/api/v1/FixedAssets/filter?pageSize=10&pageNumber=1")
            .then(response => {
                this.assets = response.data.data
                this.totalRecord = response.data.totalCount
                console.log(response.data);
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
            })
            .catch(e => {
                console.log(e);
            })
        //Tải dữ liệu thành công tắt loading
        this.isLoad=false;
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
         * Lọc dữ liệu
         * Author: Nguyễn Thị Mỹ Linh - 25/08/2022
         */
        filterData(){
            try {
                console.log("abc");
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
                }else{
                    this.asset={
                        fixedAssetCode:'', 
                        fixedAssetName:'', 
                        fixedAssetDescreption:'', 
                        departmentCode:'', 
                        departmentName:'', 
                        fixedAssetCategoryCode:'', 
                        fixedAssetCategoryName:'', 
                        quantity:Number, 
                        cost:Number,
                        lifeTime:Number, 
                        depreciationRate:Number, 
                        depreciationValue:Number,
                        trackedYear:'', 
                        purchaseDate:'', 
                        productionDate:''
                    };
                }
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

        /**
         * Đánh dấu bản ghi được chọn
         * Author: Nguyễn Thị Mỹ Linh - 14/08/2022
         */
        activeRow(asset, e, index){
            try {
                //1. Trường hợp người dùng ấn giữ phím Ctrl
                if (e.ctrlKey) {
                    //1.1 Thêm bản ghi vào list bản ghi được chọn
                    this.checkedList.push(asset.fixedAssetCode);
                    //1.2 Kiểm tra nếu người dùng chọn tất cả bản ghi thì tự động checked checkbox cha
                    if(this.checkedList.length == this.assets.length){
                        this.checkAll = true;
                    }
                    else{
                        this.checkAll = false;
                    }
                } 
                //2. Trường hợp người dùng ấn giữ phím Shift để chọn nhiều bản ghi
                else if(e.shiftKey){    
                    //2.1 Lấy vị trí bản ghi mà người dùng muốn lấy 
                    this.lastItem = index;
                    //2.2 làm rỗng danh sách chứa bản ghi được chọn
                    this.checkedList = [];
                    //2.3 Lấy danh sách các bản ghi từ vị trí bản ghi đầu tiên đến bản ghi cuối cùng mà người dùng chọn
                    //2.3.1 Nếu người dùng chọn từ trên xuống dưới
                    if(this.firstItem<this.lastItem){
                        for(let i = this.firstItem; i <= this.lastItem; i++){
                            this.checkedList.push(this.assets[i].fixedAssetCode);
                        }
                    }
                    //2.3.3 Nếu người dùng chọn từ dưới lên trên
                    if(this.firstItem > this.lastItem){
                        for(let i = this.firstItem; this.lastItem <= i ; i--){
                            this.checkedList.push(this.assets[i].fixedAssetCode);
                        }
                    }
                    //2.4 Kiểm tra nếu người dùng chọn tất cả bản ghi thì tự động checked checkbox cha
                    if(this.checkedList.length == this.assets.length){
                        this.checkAll = true;
                    }
                    else{
                        this.checkAll = false;
                    }
                }
                //3. Trường hợp người dùng không ấn giữ phím nào
                else {
                    //3.1 Nếu người dùng không giữ phím Ctrl thì khi chọn 1 bản ghi tự động làm rỗng list bản ghi được chọn
                    this.checkedList = [];
                    //3.2 Lấy vị trí bản ghi được chọn
                    this.firstItem=index;
                    //3.3 Thêm bản ghi vào list bản ghi được chọn
                    this.checkedList.push(asset.fixedAssetCode);
                    //3.4 Xóa trạng thái checked của checkbox cha
                    this.checkAll = false;
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
                        this.checkedList.push(this.assets[i].fixedAssetCode);
                    }
                }
            } catch (error) {
                console.log();
            }
        },

        /**
         * Kiểm tra nếu chọn tất cả checkbox con thì tự động checked checkbox cha
         * Author: Nguyễn Thị Mỹ Linh - 16/08/2022
         */

        /**
         * Chọn số lượng bản ghi trong 1 trang
         * Author: Nguyễn Thị Mỹ Linh - 24/08/2022
         */
        chooseRecord(number){
            axios.get(`http://localhost:47555/api/v1/FixedAssets/filter?pageSize=${number}&pageNumber=1`)
            .then(response => {
                this.assets = response.data.data
                //tính các tổng trong bảng
                let data = this.assets;
                //Reset các tổng về 0
                this.totalCost = 0;
                this.totalRealCost = 0;
                this.totalQuantity = 0;
                this.totalDepreciation = 0;
                for(let i=0;i<data.length;i++){
                    //tính tổng số lượng
                    this.totalQuantity += data[i].quantity;
                    //tính tổng nguyên giá
                    this.totalCost += data[i].cost;
                    //tính tổng hao mòn/khấu hao lũy kế
                    this.totalDepreciation += data[i].cost * (data[i].depreciationRate / 100) * data[i].lifeTime;
                    //tính tổng giá trị còn lại
                    this.totalRealCost = (this.totalCost - this.totalDepreciation);
                }
            })
            .catch(e => {
                console.log(e);
            })
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
                }else if(this.checkedList.length!=0){
                    this.messageList=[];
                    this.messageList.push(this.checkedList.length + " tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?")
                    this.title="delete";
                }

                this.isShowNotice=true;
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
        }
        
    }
}
</script>

<style scoped>
@import url("../../../assets/css/styles.css");
</style>