$('#paging').pagination({
    dataSource: '/getStaff?page=1',
    locator: 'data',
    totalNumberLocator: function (response) {
        return response.total
    },
    pageSize: 2,
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterPreviousOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    },
    afterNextOnClick: function (event, pageNumber) {
        loadPage(pageNumber)
    }
})

function loadPage(page) {
    $('#content').html('')
    $.ajax({
        url: '/getStaff?page=' + page
    })
        .then(rs => {
            for (let i = 0; i < rs.data.length; i++) {
                const element = rs.data[i];
                var item = rs.data[i];
                var item = $(`
                        <tbody>
                            <tr>
                                <td class="text-nowrap align-middle">${element.fullname}</td>
                                <td class="text-nowarp align-middle">
                                    <img src="../${element.image}" alt="" width="100px" height="100px">
                                </td>
                                <td class="text-nowrap align-middle">${element.email}</td>
                                <td class="text-nowrap align-middle">${element.age}</td>
                                <td class="text-nowrap align-middle">${element.address}</td>
                                <td class="text-center align-middle">
                                    <div class="btn-group align-top">
                                        <a href="/admin/staffEdit?id=${element._id}" class="btn btn-success">
                                            <span class="glyphicon glyphicon-edit"></span>
                                            <i class="fas fa-user-edit"></i>
                                        </a>
                                        <a  href="/admin/staffDelete?id=${element._id}" class="btn btn-danger"
                                            onclick="return confirm('Are you sure')">
                                            <span class="glyphicon glyphicon-remove"></span>
                                            <i class="fas fa-trash-alt"></i>
                                        </a>
                                        <a href="/admin/changePwdStaff?id=${element._id}" class="btn btn-warning">
                                            <span class="glyphicon glyphicon-cog"></span>
                                            <i class="fas fa-lock"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>  
            `)
                $('#content').append(item)
            }
        })
}
loadPage(1)

function toast({
    title = '',
    message = '',
    type = '',
    duration = 3000
}) {

    const main = document.getElementById('toast');
    if (main) {
        const toast = document.createElement('div');

        // auto removed toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000);

        // removed toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }

        const icons = {
            success: 'far fa-check-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-exclamation'
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`;
        toast.innerHTML = `
                    <div class="toast__icon"> 
                        <i class="${icon}"></i> 
                    </div>    

                    <div class="toast__body"> 
                            <h3 class="toast__title">${title}</h3> 
                            <p class="toast__msg">${message}</P>
                    </div>

                    <div class="toast__close">
                            <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
            `;
        main.appendChild(toast);
    }

}

function showSuccessToast() {
    toast({
        title: 'Notification!',
        message: 'Crush love this your photo',
        type: 'success',
        duration: 5000
    })
}
function showErrorToast() {
    toast({
        title: 'Problems!',
        message: 'You have just be blocked by crush',
        type: 'error',
        duration: 5000
    })
}


