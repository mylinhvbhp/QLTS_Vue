export function numberFormat(x) {
    return x.toString().replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatNumber(x){
    try {
        return x.split('.').join('');
    } catch (error) {
        console.error(error);
        return "";
    }
}

export function numberFormatInput(str){
    return str.toString().replace(/^0+/, '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatDate(dob){
    try {
        if(dob){
            dob=new Date(dob);
            //lấy ngày
            let date = dob.getDate();
            date = (date < 10 ? `0${date}` : date);
            //lấy tháng
            let month = dob.getMonth() + 1;
            month = (month < 10 ? `0${month}` : month);
            //lấy năm
            let year = dob.getFullYear();
    
            dob = `${date}/${month}/${year}`;
        }
        return dob;
    } catch (error) {
        console.error(error);
    }
}

