<template>
  <div class="combobox">
    <div class="form-input" :class="{'tooltip-input': validateCombobox || showTooltip}">
      <input
        type="text"
        class="input combobox__input"
        v-model="text"
        :placeholder="[[placeholder]]"
        :tabIndex="tabIndex"
        @input="inputOnChange"
        @keydown="selecItemUpDown" 
        ref="inputCombobox"
        @blur="checkInputCombobox(this.$refs['inputCombobox'])"
        :class="{'border-red': validateCombobox}"
      />
      <div v-show="text" class="icon icon-delete-filter" @click="deleteFilter()"></div>
      <div v-if="!text && (this.typeCombobox=='comboboxForm') && (showTooltip || validateCombobox)" class="tooltip" style="color:red; margin-top:-70px">{{ placeholder }} không được bỏ trống</div>
    </div>
    <button
      class="combobox__button"
      @click="btnSelectDataOnClick"
      @keydown="selecItemUpDown"
      tabindex="-1"
    >
      <div class="icon icon-down"></div>
    </button>
    <div
      v-show="isShowListData"
      class="combobox__data"
      ref="combobox__data"
      v-clickoutside="hideListData"
    >
      <a
        class="combobox__item"
        v-for="(item, index) in dataFilter"
        :class="{
          'combobox__item--focus': index == indexItemFocus,
          'combobox__item--selected': index == indexItemSelected,
        }"
        :key="item[this.propValue]"
        :ref="'toFocus_' + index"
        :value="item[this.propValue]"
        @click="itemOnSelect(item, index)"
        @focus="saveItemFocus(index)"
        @keydown="selecItemUpDown(index)"
        @keyup="selecItemUpDown(index)"
        tabindex="1"
      >
        <div class="combobox__item-icon">
          <i v-show="index == indexItemSelected" class="fa-solid fa-check"></i>
        </div>
        <p> <span style = "width:50px" v-if="(this.typeCombobox=='comboboxForm')">{{ item[this.propCode] }} - </span>{{ item[this.propText] }} </p>
      </a>
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * Gán sự kiện nhấn click chuột ra ngoài combobox data (ẩn data list đi)
 */
const clickoutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Nếu element hiện tại không phải là element đang click vào
      // Hoặc element đang click vào không phải là button trong combobox hiện tại thì ẩn đi.
      if (
        !(
          (
            el === event.target || // click phạm vi của combobox__data
            el.contains(event.target) || //click vào element con của combobox__data
            el.previousElementSibling.contains(event.target)
          ) //click vào element button trước combobox data (nhấn vào button thì hiển thị)
        )
      ) {
        // Thực hiện sự kiện tùy chỉnh:
        binding.value(event, el);
        // vnode.context[binding.expression](event); // vue 2
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount: (el) => {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
};
export default {
  directives: {
    clickoutside,
  },
  props: {
    value:null,
    url: String,
    propValue: String,
    propText: String,
    propCode: String,
    isLoadData: {
      type: Boolean,
      default: true,
    },
    placeholder: String,
    tabIndex:Number,
    valueDefault:String,
    typeCombobox:String,
    validateCombobox:Boolean
  },
  methods: {
    saveItemFocus(index) {
      if(this.indexItemFocus != index){
        this.indexItemFocus = index;
      }
      else{
        let item = {};
        this.itemOnSelect(item, index)
        this.indexItemFocus = null;
      }
    },
    hideListData() {
      this.isShowListData = false;
    },

    btnSelectDataOnClick() {
      this.isShowListData = !this.showListData;
    },

    itemOnSelect(item, index) {
      if(this.indexItemSelected != index){
        this.text = item[this.propCode];
        this.indexItemSelected = index;
        this.isShowListData = false;
        this.valueInput=item[this.propText];
        this.$emit('getName', this.valueInput, item[this.propValue])
        this.$emit('getID',item[this.propValue])
      }else{
        this.indexItemSelected=null;
        this.isShowListData = false;
        this.text="";
        this.valueInput="";
        this.$emit('getName', "", "")
        this.$emit('getID',"")
      }
      
    },

    inputOnChange() {  
      var me = this;
      // Thực hiện lọc các phần tử phù hợp trong data:
      this.dataFilter = this.data.filter((e) => {
        let valueName = e[me.propText].includes(me.text);
        let valueCode = e[me.propCode].includes(me.valueInput);
        return valueCode,valueName;
      });
      this.isShowListData = true;
    },

    selecItemUpDown() {
      var me = this;
      var keyCode = event.keyCode;
      var elToFocus = null;
      switch (keyCode) {
        case 27:
          this.isShowListData = false;
          break;
        case 40:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus + 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = 0;
          } else {
            this.indexItemFocus += 1;
          }
          break;
        case 38:
          this.isShowListData = true;
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus - 1}`];
          if (
            this.indexItemFocus == null ||
            !elToFocus ||
            elToFocus.length == 0
          ) {
            this.indexItemFocus = this.dataFilter.length - 1;
          } else {
            this.indexItemFocus -= 1;
          }
          break;
        case 13:
          elToFocus = this.$refs[`toFocus_${me.indexItemFocus}`];
          if (elToFocus && elToFocus.length > 0) {
            elToFocus[0].click();
            this.isShowListData = false;
          }
          break;
        default:
          break;
      }
    },

    /**
     * Kiểm tra combobox có bị trống hay không
     * Author: Nguyễn Thị Mỹ Linh - 10/09/2022
     */
    checkInputCombobox(input){
      try {
          if (!input.value && this.typeCombobox=="comboboxForm" ) {
              input.classList.add("border-red");
              this.showTooltip = true;
          }
          else {
              input.classList.remove("border-red");
              this.showTooltip = false;
          }
      } catch (error) {
          console.error(error);
      }
    },

    /**
     * Xóa filter
     * Athor: Nguyễn Thị Mỹ Linh - 19/09/2022
     */
    deleteFilter(){
      try {
        this.indexItemSelected=null;
        this.isShowListData = false;
        this.indexItemFocus = null;
        this.text="";
        this.valueInput="";
        this.$emit('getName', "", "")
        this.$emit('getID',"")
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    // Thực hiện lấy dữ liệu từ api:
    if (this.url) {
      fetch(this.url)
        .then((res) => res.json())
        .then((res) => {
          this.data = res;
          this.dataFilter = res;
        })
        .catch((res) => {
          console.error(res);
        });
    }
    this.text=this.valueDefault;
  },
  data() {
    return {
      data: [],
      dataFilter: [],
      text: null,
      valueInput:"",
    //   value: null,
      isShowListData: false,
      focus: false,
      indexItemFocus: null,
      indexItemSelected: null,
      maxIndexItemFocus: 0,
      showTooltip:false
    };
  },
};
</script>
