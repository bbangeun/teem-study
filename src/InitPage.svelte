<script>
  let iInvaildCnt = 0
  function onClickedLogin () {
    iInvaildCnt += 1
  }
</script>

<div id="dv_Main">
  <div id="dv_Sub">
    <label class="lb">아이디 : <input class="edt" type="text" /></label>
    <br />
    <label class="lb">비밀번호 : <input class="edt" type="password" /></label>
    <br />
    <label class="lb"
      ><button id="btn_Login" type="button" on:click={onClickedLogin}
        >로그인</button
      ></label
    >
    <label class="lb" data-testid="counter-value">{iInvaildCnt}</label>
  </div>
</div>

<style>
  #dv_Main {
    margin-top: 50px;
    /*ackground-color: antiquewhite;*/
  }
  #dv_Sub {
    margin-top: 50px;
    /*background-color: green;*/
    width: 400px;
    display: inline-block;
  }
  .lb {
    margin-top: 10px;
    margin-right: 10px;
    width: 100px;
    /* display: inline-block;         */
    justify-items: center;
    text-align: center;
    /*background-color: green;*/
  }
  .edt {
    width: 150px;
    margin-top: 20px;
    margin-right: 10px;
  }
  #btn_Login {
    width: 160px;
    background-color: mediumspringgreen;
    margin-top: 20px;
  }
</style>
