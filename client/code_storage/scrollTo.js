export default {
  methods: {
      scrollTo(e) {
          const scrollToID = e.target.dataset.scrollTo || e.target.parentNode.dataset.scrollTo
          if (!scrollToID) return
          const element = document.getElementById(scrollToID)
          const navHeight = document.querySelector('nav').clientHeight
          window.scrollTo({
              behavior: 'smooth',
              top: element.offsetTop - navHeight
          })
      },
  }
}