import { useState } from 'react';
import './sharestyle.css';

function App() {

  let mfr = {
    mfr_id: -1,
    mfr_photo: "https://i.pravatar.cc/48",
    mfr_fname: " ",
    mfr_finfo: " ",
    mfr_amount: 0,
    mfr_active: true
  }

  let [fnd, setfnd] = useState(mfr);

  let [myfriends, setmyfriendslist] = useState([]);
  let [myfriendsstate, setmyfriendsstate] = useState(false);
  let [billvisible, setbillvisible] = useState(false);

  return (
    <div className='middler'>
      <div className='main_head'>MyShare</div>
      <div className='main_div'>
        <Subdiv1 myfriends={myfriends} setmyfriendslist={setmyfriendslist}
          myfriendsstate={myfriendsstate} setmyfriendsstate={setmyfriendsstate}
          billvisible={billvisible} setbillvisible={setbillvisible} fnd={fnd} setfnd={setfnd} />
        <Subdiv2 myfriends={myfriends} setmyfriendslist={setmyfriendslist} billvisible={billvisible} setbillvisible={setbillvisible} fnd={fnd} setfnd={setfnd} />
      </div>
    </div>
  );
}

function Subdiv1({ myfriends, setmyfriendslist, myfriendsstate, setmyfriendsstate, billvisible, setbillvisible, fnd, setfnd }) {
  return (
    <div className='sub_div'>
      <Friendlister myfriends={myfriends} setmyfriendslist={setmyfriendslist}
        myfriendsstate={myfriendsstate} setmyfriendsstate={setmyfriendsstate}
        billvisible={billvisible} setbillvisible={setbillvisible} fnd={fnd} setfnd={setfnd} />
    </div>
  )
}

function Subdiv2({ myfriends, setmyfriendslist, billvisible, setbillvisible, fnd, setfnd }) {
  return (
    <div className='sub_div bg1'>
      <Billform myfriends={myfriends} setmyfriendslist={setmyfriendslist} billvisible={billvisible} setbillvisible={setbillvisible} fnd={fnd} setfnd={setfnd} />
    </div>
  )
}

function Friendlister({ myfriends, setmyfriendslist, myfriendsstate,
  setmyfriendsstate, billvisible, setbillvisible, fnd, setfnd }) {
  let [frname, setfrname] = useState("");
  let [frurl, setfrurl] = useState("");

  function Handlefadder() {

    if (frname === " " || frname === "") {
      alert("Friend name cannot be empty");
      return;
    }

    let mfr = {
      mfr_id: -1,
      mfr_photo: "https://i.pravatar.cc/48",
      mfr_fname: frname,
      mfr_finfo: " ",
      mfr_amount: 0,
      mfr_active: true
    }
    setmyfriendslist((myfriends) => [...myfriends, mfr])
  }

  function Handlefclose() {
    setmyfriendsstate((myfriendsstate) => !myfriendsstate);
    console.log(myfriends);
  }

  return (
    <div className='flistdiv'>
      <article className='articlelist'><Flister myfriends={myfriends} setmyfriendslist={setmyfriendslist}
        billvisible={billvisible} setbillvisible={setbillvisible} fnd={fnd} setfnd={setfnd} /></article>
      <Fimgadd furladd="https://res.cloudinary.com/dc6bhwpf2/image/upload/v1697087383/samples/cloudinary-icon.png"
        myfriendsstate={myfriendsstate} setmyfriendsstate={setmyfriendsstate} />
      {myfriendsstate &&
        (<Friendinput fhead="Friend name🫂" furl="https://i.pravatar.cc/48"
          furlhead="Image URL" frname={frname} frurl={frurl} setfrname={setfrname} setfrurl={setfrurl}>
          <><Mbutton width={"180px"} onClik={Handlefadder}><span>ADD FRIEND</span></Mbutton>
            <Mbutton width={"180px"} onClik={Handlefclose}><span>CLOSE</span></Mbutton></>
        </Friendinput>)}

    </div>
  )
}

function Fimgadd({ furladd, setmyfriendsstate }) {

  function Handlefadd() {
    setmyfriendsstate((myfriendsstate) => !myfriendsstate)
  }

  return (
    <div className='middler'>
      <img className='tinp' src={furladd} alt="url adder" width={"64px"} height={"64px"} onClick={Handlefadd} />
    </div>
  )
}

function Billform({ myfriends, setmyfriendslist, billvisible, setbillvisible, fnd, setfnd }) {
  let [payer, setpayer] = useState("");
  let [billvalue, setbillvalue] = useState(0);
  let [yourexpense, setyourexpense] = useState(0);

  function Handlesplit() {
    if ((isNaN(Number(billvalue)) || isNaN(Number(yourexpense)))) {
      alert("Value in bill/expense is not a number");
      return;
    }
    else {
      if ((billvalue === 0) || (yourexpense === 0)) {
        alert("Bill/expense cannot be zero");
        return;
      }
    }
    let current_amount = Number(fnd.mfr_amount);
    let partition = Number(billvalue / 2);
    if ((payer === "You") || (payer === " ") || (payer === "")) {
      console.log("You");
      if (yourexpense > partition) {
        current_amount = current_amount - (yourexpense - partition);
      }
      else {
        if (yourexpense < partition) {
          current_amount = current_amount + (partition - yourexpense);
        }
      }
    }
    else {
      console.log(fnd);
      if (yourexpense > partition) {
        current_amount = current_amount + (yourexpense - partition);
      }
      else {
        if (yourexpense < partition) {
          current_amount = current_amount - (partition - yourexpense);
        }
      }
    }

    if (current_amount === 0) {
      fnd.mfr_finfo = `You are even`
    }
    else {
      if (current_amount < 0) {
        fnd.mfr_finfo = `You are owed ${current_amount * -1}`
      }
      else {
        fnd.mfr_finfo = `You owe ${current_amount}`
      }
    }

    setmyfriendslist((myfriends) => {
      let currfriends = [...myfriends];
      let tempfriends = currfriends.map((item, index) => {
        return index === fnd.mfr_id ?
          ({ ...item, mfr_finfo: fnd.mfr_finfo, mfr_amount: current_amount })
          : ({ ...item });
      })
      return tempfriends;
    })

    setbillvisible(billvisible => !billvisible);
  }

  return (!billvisible ?
    (<div className='flistdiv bform'>
      <h3>Start splitting your share with your friends.</h3>
      <h3>Click on the button left side to add friends.</h3>
    </div>) :
    (<div className='flistdiv bform'>
      <h3>SPLIT A BILL WITH {fnd.mfr_fname}</h3>
      <div className='frow'>
        <div>Bill value 💰</div>
        <div><input type="number" value={billvalue} onChange={(e) => setbillvalue(e.target.value)} /></div>
      </div>
      <div className='frow'>
        <div>Expense 🙍‍♂️</div>
        <div><input type="number" value={yourexpense} onChange={(e) => setyourexpense(e.target.value)} /></div>
      </div>
      <div className='frow'>
        <div>Bill Payer 🤑</div>
        <div>
          <select value={payer} onChange={(e) => setpayer(e.target.value)} >
            <option value="You">You</option>
            <option value="Notyou">{fnd.mfr_fname}</option>
          </select>
        </div>
      </div>
      <Mbutton width={"180px"} onClik={Handlesplit}><span>SPLIT BILL</span></Mbutton>
    </div>)
  )
}
// COMPONENTS BELOW 

function Flister({ myfriends, setmyfriendslist, setbillvisible, fnd, setfnd }) {

  function Handleselect(frnd) {
    setbillvisible((billvisible) => !billvisible);
    console.log(frnd);
    setfnd({ ...frnd });
  }

  function Handlecloser(frnd) {
    if (frnd.mfr_amount === 0) {
      alert("You are even and can be closed");
      setmyfriendslist((myfriends) => myfriends.filter((item, index) => index !== frnd.mfr_id))
    }
    else {
      var res = window.confirm("You are not even, do you still want to delete?")
      if (res) {
        setmyfriendslist((myfriends) => myfriends.filter((item, index) => index !== frnd.mfr_id))
      }
    }
  }

  return (
    myfriends.map((friend, index) => {
      friend.mfr_id = index;
      return (
        <div className='flist' key={index} >
          <div style={{ width: "15%" }}><img src={friend.mfr_photo} alt={"friend's"} style={{ borderRadius: "30px" }} /></div>
          <div style={{ width: "60%" }}>
            <div style={{ color: "hsl(183, 100%, 35%)" }}>{friend.mfr_fname}</div>
            <div>{friend.mfr_finfo}</div>
          </div>
          <div onClick={() => Handlecloser(friend)} className='tinp'>❌</div>
          <Mbutton width={""} onClik={() => Handleselect(friend)}><span>Select</span></Mbutton>
        </div>
      )
    })
  )
}

function Mbutton({ width, onClik, children }) {
  return (
    <div className='bclass tinp' style={{ width: width }} onClick={onClik}>
      {children}
    </div>
  )
}

function Friendinput({ fhead, furl, furlhead, frname, setfrname, frurl, setfrurl, children }) {
  return (
    <div className='flistdiv finput'>
      <div className='frow'>
        <div>{fhead}</div>
        <div><input type="text" value={frname} onChange={(e) => setfrname(e.target.value)} /></div>
      </div>
      <div className='frow'>
        <div>{furlhead}</div>
        <div><input type="text" value={frurl} onChange={(e) => setfrurl(furl)} placeholder={furl} /></div>
      </div>
      <div className='frow'>
        {children}
        {/* <><Mbutton width={"180px"}><span>CLOSE</span></Mbutton></> */}
      </div>
    </div>
  )
}

export default App;
