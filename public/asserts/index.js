/**
 * Created by pinguo on 2017/7/18.
 */
const headers = new Headers();
headers.append('Content-Type', 'application/json'); // 必须设置Content-Type 否则Node接收不到
const req = new Request('/postPageConfig', {
    headers: headers,
    method: 'post',
    body: JSON.stringify({
        componentName: 'Tree'
    })
});

fetch(req)
    .then(res => res.json())
    .then(res => {
        document.querySelector('p').innerText = res.componentName;
});