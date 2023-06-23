// Biến toàn cục mảng hai chiều chứa tất cả các học viên
let listStudent =[
    ["SV001", "Nguyen Van A", "abc@gmail.com","0348585949","Ha Noi", "Male"]
];
let action = "create";
// Hàm render dữ liệu từ listStudent ra table 
function renderData() {
    // Lấy ra phần tử sẽ được render dữ liệu 
    let tbody = document.getElementById("content");
    //  Đặt tbody chưa chứa dữ liệu 
    tbody.innerHTML = "";
    for (let index = 0; index < listStudent.length; index++) {
       //Render dữ liệu từng tr của tbody
       tbody.innerHTML+=`<tr>
                            <td>${index+1}</td>
                            <td>${listStudent[index][0]}</td>
                            <td>${listStudent[index][1]}</td>
                            <td>${listStudent[index][2]}</td>
                            <td>${listStudent[index][3]}</td>
                            <td>${listStudent[index][4]}</td>
                            <td>${listStudent[index][5]}</td>
                            <td>
                                <button onclick="editStudent('${listStudent[index][0]}')" >Edit </button>
                                <button onclick="deleteStudent('${listStudent[index][0]}')" >Delete </button>
                            </td>
                        </tr>`
                    
    }
}
//Ham validate du lieu khach hang nhap vao khi them moi hoac cap nhat
function validateForm() {
    // 1. Lay du lieu tu form
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.querySelector("input[name='gender']:checked").value;
    // 2. Thuv hien validate, neu thoa man --> true, co loi thong bao --> false
    // Validate studentId
    if (studentId=="") {
        alert("vui lòng nhập mã sinh viên");
        return false;
    }
    // validate studentNamee
    if (studentName=="") {
        alert("vui lòng nhập vào họ và tên");
        return false;
    }
    // Validate email
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailPattern)) {
        alert("vui lòng nhập email đúng định dạng");
        return false;
    }
    //  Validate phoner
    let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phone.match(phonePattern)) {
        alert("vui lòng nhập số điện thoại đúng định dạng");
        return false;
    }
    // validate address
    if (address=="") {
        alert("vui lòng nhập đúng địa chỉ");
        return false;
    }
    return true;
}
//Ham thuc hien them moi hoac cap nhat sinh vien
function createOrEdit() {
    if (validateForm()) {
        let studentId = document.getElementById("studentId").value;
        let studentName = document.getElementById("studentName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let sex = document.querySelector("input[name='gender']:checked").value;
        if (action=="create") {
            //thuc hien them moi sinh vien
              //1.lay du lieu tu form
              //2. push sinh vien vao mang 2 chieu liststudent
              listStudent.push([studentId,studentName,email,phone,address,sex]);

        }else{
            //thuc hien cap nhat sinh vien cung lay du lieu tu form
            // 2. lay chi so sinh vien trong mang
            let index = getStudentByStudentId(studentId);
            // 3. tien hanh cap nhat
            listStudent[index][1] = studentName;
            listStudent[index][2] = email;
            listStudent[index][3] = phone;
            listStudent[index][4] =address;
            listStudent[index][5] = sex;
            // Cho phép nhập studentId
            document.getElementById("studentId").readOnly = false;

        }
        // Xoa du lieu ten form khi them moi hoac cap nhat
        document.getElementById("studentId").value="";
        document.getElementById("studentName").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
        document.getElementById("address").value="";
        document.getElementById("male").checked=true;

        // render lai du lieu tren table
        renderData();
    }
}
//Ham lay chi so sinh vien trong listStudent tu studentId
function getStudentByStudentId(studentId) {
    for (let index = 0; index < listStudent.length; index++) {
        if (studentId==listStudent[index][0]) {
            return index;
        }
        return -1;
    }
}

//Ham thuc hien lay student Id tu table va lay du lieu tu liststudent va fill len form
function editStudent(studentId) {
    // 1. Lay chi so sinh vien trong mang
    let index = getStudentByStudentId(studentId);

    if (index>=0) {
        // 2.fill thong tin sinh vien ra form
        document.getElementById("studentId").value=listStudent[index][0];
        document.getElementById("studentName").value=listStudent[index][1];
        document.getElementById("email").value=listStudent[index][2];
        document.getElementById("phone").value=listStudent[index][3];
        document.getElementById("address").value=listStudent[index][4];
        if (listStudent[index][5]=="male") {
            document.getElementById("male").checked=true;
        }else{
            document.getElementById("female").checked=true;
        }
        //Doi action = edit;
        action = "edit";
        // De studentId thanh readOnly
        document.getElementById("studentId").readOnly=true;
    }
}

// ham thuc hien xoa sinh vien
function deleteStudent(studentId) {
    // 1. Lay index sinh vien trong mang
    let index = document.getElementById(studentId);
    // 2. Xoa theo index
    listStudent.splice(index,1);
    //3. render lai
    renderData();
}

//Khi trinh duyet load thi se load du lieu student va hien thi tren table
document.onload = renderData();
//truy cap vao phan tu save va gan su kien click
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click" ,function(event) {
    // CHan su kien submit default cua form
    event.preventDefault();
    createOrEdit();
})