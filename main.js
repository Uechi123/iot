let autoMode = true; // Chế độ tự động mặc định

// Hàm điều khiển mở, đóng hoặc chuyển sang chế độ tự động
function control(action) {
    fetch(`/control?action=${action}`)
        .then(response => response.text())
        .then(data => {
            alert(data); // Hiển thị thông báo
            if (action === "auto") {
                autoMode = true;
            } else {
                autoMode = false;
            }
            updateStatus(); // Cập nhật trạng thái sau khi thay đổi chế độ
        })
        .catch(error => console.error("Error:", error));
}

// Hàm cập nhật trạng thái và khoảng cách
function updateStatus() {
    fetch("/status") // Gọi trực tiếp API /status để lấy trạng thái
        .then(response => response.text())
        .then(data => {
            document.getElementById("status").innerText = data; // Cập nhật trạng thái từ server
        })
        .catch(error => {
            console.error("Error fetching status:", error);
            document.getElementById("status").innerText = "Error!"; // Nếu có lỗi
        });

    fetch("/distance") // Gọi API /distance để lấy khoảng cách
        .then(response => response.text())
        .then(data => {
            document.getElementById("distance").innerText = data + " cm"; // Hiển thị khoảng cách
        })
        .catch(error => {
            console.error("Error fetching distance:", error);
            document.getElementById("distance").innerText = "Error!"; // Nếu có lỗi
        });
}

// Gửi yêu cầu cập nhật trạng thái mỗi giây
setInterval(updateStatus, 1000); // Gửi yêu cầu mỗi 1 giây
updateStatus(); // Cập nhật trạng thái ngay khi tải trang

