
var APP = {
  el: {
    selectSize: document.querySelector('#select_size'),
    modalSelect: document.querySelector('#size_select_modal'),
    sizeItem: document.querySelectorAll('#size_select_modal li'),
    addToBagBtn: document.querySelector('#add_to_bag')
  },
  state: {
    sizeSelected: false,
    addingProduct: false
  },

  init: function() {
    APP.initModal();
    APP.initCTAButtonHandler();
  },

  initModal: function() {
    var _this = this;
    _this.el.selectSize.addEventListener('click', function() {
      _this.el.modalSelect.style.display = 'block';
    });

    var sizeList = _this.el.sizeItem;
    for (var i=0; i < sizeList.length; i++) {
      sizeList[i].addEventListener('click', function() {
        _this.el.modalSelect.style.display = 'none';
        _this.el.selectSize.textContent = this.textContent;
        _this.state.sizeSelected = true;
        if (_this.state.addingProduct) {
          _this.addProductToBag();
        }
      });
    }
  },

  initCTAButtonHandler: function() {
    var _this = this;

    this.el.addToBagBtn.addEventListener('click', function(e) {
      e.preventDefault();
      _this.state.addingProduct = true;
      if (!_this.state.sizeSelected) {
        _this.el.selectSize.click();
      } else {
        _this.addProductToBag();
      }
    });
  },

  addProductToBag: function() {
    var _this = this;
    // simulate the button animation
    // adding product

    // product added to bag

    _this.state.addingProduct = false;
  }

}

window.addEventListener('load', APP.init);