import axios from 'axios'

const options = {
  method: 'POST',
  url: 'https://api.prodia.com/v1/job',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Prodia-Key': '433f6624-ec6c-41a8-841d-805381a319b7'
  },
  data: { model: 'anythingv3_0-pruned.ckpt [2700c435]', prompt: 'dog' }
}

axios
  .request(options)
  .then(function (response) {
    console.log(response.data)
  })
  .catch(function (error) {
    console.error(error)
  })
