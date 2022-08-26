<template>
  <!-- <select>
        <option v-for="item in data" :key="item[this.propValue]" value="{{item[this.propValue]}}">
            {{ item[this.propText] }}
        </option>
    </select> -->
  <div class="combobox">
    <input
      type="text"
      class="input combobox__input"
      v-model="text"
      :placeholder="[[placeholder]]"
      :tabIndex="tabIndex"
      @input="inputOnChange"
      @keydown="selecItemUpDown"
    />
    <button
      class="button combobox__button"
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
        {{ item[this.propText] }}
      </a>
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * Gán sự kiện nhấn click chuột ra ngoài combobox data (ẩn data list đi)
 * NVMANH (31/07/2022)
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
    console.log("beforeUnmount");
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
    propName: String,
    isLoadData: {
      type: Boolean,
      default: true,
    },
    placeholder: String,
    tabIndex:Number,
    valueDefault:String,
  },
  methods: {
    saveItemFocus(index) {
      this.indexItemFocus = index;
    },
    hideListData() {
      this.isShowListData = false;
    },

    btnSelectDataOnClick() {
      this.isShowListData = !this.showListData;
    },

    itemOnSelect(item, index) {
      this.text = item[this.propText];
      this.indexItemSelected = index;
      this.isShowListData = false;
      this.valueInput=item[this.propName];
      this.$emit('getNameDepartment', this.valueInput)
      this.$emit('getNameCategory', this.valueInput)
    },

    inputOnChange() {
      var me = this;
      // Thực hiện lọc các phần tử phù hợp trong data:
      this.dataFilter = this.data.filter((e) => {
        let valueCode = e[me.propText].includes(me.text);
        let valueName = e[me.propName].includes(me.valueInput);
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
          console.log(res);
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
    };
  },
};
</script>
