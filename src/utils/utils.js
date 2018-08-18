export default {
    formateDate(time){
        if(!time) return '';
        let date = new Date(time);
        return `
                ${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} 
                ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
         `; 
    },
    pagination(data,callback){
        return {
            current:data.result.current,
            onChange: (current,pageSize)=>{
                callback(current, pageSize);
            },
            onShowSizeChange: (current, pageSize) => {
                callback(current, pageSize);
            },
            pageSize:data.result.page_size,
            total: data.result.total_count,
            showTotal:()=>{
                return `共${data.result.total_count}条`
            },
            showQuickJumper:true,
            showSizeChanger:true
        }
    }
}