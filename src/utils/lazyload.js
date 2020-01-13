function getTop(elm){
  let tempTop = elm.offsetTop;
  //如果包裹img的父元素离顶部也有距离，那么也要把它加上
  while(elm = elm.offsetParent) { //注意这儿offsetParent返回的是元素不是数值，同时这儿是赋值语句
    tempTop += elm.offsetTop;
  }
  return tempTop;
}

function lazyLoad(imgs){
  //获取可视区域高度
  let viewHeight = document.documentElement.clientHeight;
  //获取滚动高度
  let scrollTopVal = document.documentElement.scrollTop || document.body.scrollTop;
  console.log(viewHeight, scrollTopVal)
  for(var i = 0; i < imgs.length; i++){
      if((viewHeight + scrollTopVal) > getTop(imgs[i])){
        imgs[i].src = imgs[i].getAttribute('data-src')
      }
  }
}

function useIntersectionObserve(imgList) {
  let obsever = new IntersectionObserver((entries) => {
    entries.forEach((item, index, arrSelf) => {
      console.log(entries)
      if(item.isIntersecting) {
        item.target.src = item.target.dataset.src;
        obsever.unobserve(item.target);
      }
    });
  });

  imgList.forEach((item) => {
    obsever.observe(item);
  });
}


export default {
  // 这两个个方案要求img标签有默认的高度，不然当一个页面出来就展示图片的情况下会一下展示很多图片，
  // 所以在使用懒加载方案时给img加默认高度
  // 单独使用普通懒加载方案
  lazyloadDefault(selector) {
    let imgList = document.querySelectorAll(selector);

    lazyLoad(imgList);
    window.onscroll = function() {
      lazyLoad(imgList);
    }
  },
  // 单独使用IntersectionObserve
  lazyLoadIntersectionObserver(selector) {
    let imgList = document.querySelectorAll(selector);

    let obsever = new IntersectionObserver((entries) => {
      entries.forEach((item, index, arrSelf) => {
        console.log(entries)
        if(item.isIntersecting) {
          item.target.src = item.target.dataset.src;
          obsever.unobserve(item.target);
        }
      });
    });

    imgList.forEach((item) => {
      obsever.observe(item);
    });
  },
  // 多浏览器适配方案
  lazyLoadPolyfill(selector) {
    let imgList = document.querySelectorAll(selector);

    if(!window.IntersectionObserver) {
      lazyLoad(imgList);
      window.onscroll = function() {
        lazyLoad(imgList);
      }
    }else {
      useIntersectionObserve(imgList)
    }
  }
}