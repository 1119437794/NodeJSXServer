/**
 * Created by pinguo on 2017/7/18.
 */
const headers = new Headers();
headers.append('Content-Type', 'application/json'); // 必须设置Content-Type 否则Node接收不到


document.querySelector('.button').addEventListener('click', function () {
    fetch('/download');
    console.log(1010)
});

document.querySelector('select').addEventListener('change', function (e) {
    const req = new Request('/postPageConfig', {
        headers: headers,
        method: 'post',
        body: JSON.stringify({
            componentName: e.target.value
        })
    });

    fetch(req)
        .then(res => res.json())
        .then(res => {
            document.querySelector('p').innerText = res.componentName;
            try {
                document.querySelector('#bundle').remove();
            } catch (err) {
                console.log('此节点不存在');
            }

            const script = document.createElement('script');
            script.id = 'bundle';
            script.src = res.url;
            document.body.appendChild(script);
        });
})