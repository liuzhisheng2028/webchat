self.onmessage = function () {
  const checkVersion = () => {
    fetch('/version.json?t=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        self.postMessage(data) // 将信息发送到主线程上
      })
    setTimeout(checkVersion, 1000 * 10)
  }
  checkVersion()
}
