<script>
    
let iInvaildCnt = 0;

function onClickedLogin(){
    iInvaildCnt = iInvaildCnt + 1;
}
</script>

<div id="dv_Main">    
    <div id="dv_Sub">    
        <label class="lb"> 아이디:</label>
        <input class="edt" type="text"/>            
        <br/>
        <label class="lb">비밀번호:</label>
        <input class="edt" type="password"/>
        <br/>
        <label class="lb"></label>
        <button id="btn_Login"type="button" on:click={onClickedLogin}>로그인</button>
        <br/>        
        <label class="lb"></label>
        <label class="lb">{iInvaildCnt}</label>
    </div>
</div>
<style>
    #dv_Main{
        margin-top: 50px;
        /*ackground-color: antiquewhite;*/
    }
    #dv_Sub{
        margin-top: 50px;
        /*background-color: green;*/
        width: 400px;
        display: inline-block;        
    }
    .lb{
        margin-top: 10px;        
        margin-right: 10px;        
        width: 100px;
        display: inline-block;        
        justify-items: center;
        text-align: center;
        /*background-color: green;*/
    }
    .edt{
        width: 150px;
        margin-top:   20px;        
        margin-right: 10px;        
    }
    #btn_Login{
        width: 160px;
        background-color: mediumspringgreen;
        margin-top: 20px;
    }
</style>