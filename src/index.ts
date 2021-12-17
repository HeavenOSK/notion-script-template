const exec = async () => {
  console.log('Hello world')
}
exec().then(_ => console.log('success')).catch(_ => 'failed')
