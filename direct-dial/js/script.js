document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(location.search)
  const rawNumber = params.get("number")

  const num = document.getElementById("num")
  const call = document.getElementById("call")
  const wrapper = document.getElementById("wrapper")

  if(rawNumber){
    const displayNumber = rawNumber
    let dialNumber = rawNumber.trim()
    dialNumber = dialNumber.replace(/[^\d+]/g,"")

    if(dialNumber.indexOf("+") > 0){
      dialNumber = dialNumber.replace(/\+/g,"")
    }

    if(dialNumber.startsWith("+")){
      dialNumber = "+" + dialNumber.slice(1).replace(/\+/g,"")
    }

    if(dialNumber.length < 3){
      showError()
      return
    }

    animateNumber(num, displayNumber)
    call.href = "tel:" + dialNumber

  } else {
    showError()
  }

  function showError(){
    num.textContent = "Invalid number"
    num.classList.add("error")
    call.style.display = "none"
    wrapper.classList.add("error-mode")
  }

  function animateNumber(el, text){
    let i = 0
    el.textContent = ""
    function type(){
      if(i < text.length){
        el.textContent += text[i]
        i++
        setTimeout(type, 32)
      }
    }
    type()
  }

  call.addEventListener("click", function(e){
    const circle = document.createElement("span")
    const diameter = Math.max(call.clientWidth, call.clientHeight)
    const radius = diameter / 2
    circle.style.width = circle.style.height = diameter + "px"
    circle.style.left = (e.offsetX - radius) + "px"
    circle.style.top = (e.offsetY - radius) + "px"
    circle.classList.add("ripple")
    const ripple = call.getElementsByClassName("ripple")[0]
    if(ripple){
      ripple.remove()
    }
    call.appendChild(circle)
  })

})