export default {
  processRedirect(url, addRedirectParam = false, message = '') {
    console.log('start')
    if (typeof window === 'undefined')
      // return new Promise(resolve =>
      //   setTimeout(() => this.processRedirect(url, addRedirectParam, message), 500)
      // )
      return
    const redirectParam = addRedirectParam
      ? `redirect=${window.location.href}&`
      : ''
    const messageParam = message ? `message=${message}` : ''

    const redirectUrl = `${url}?${redirectParam}${messageParam}`
    console.log('end')

    return window.location.replace(redirectUrl)
  },
}
