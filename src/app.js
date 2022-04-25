import React, { useEffect, useState } from "react";
import './app.css';
import logo from "./MAGUSQR_3.png";
import Web3 from "web3";
import { createRef } from "react";
const App = () => {
  const [connected,changeOption] = useState(false);
  var web3 = new Web3(window.ethereum);
  var connectedAccount;
  const [contract,updateContract]=useState(null);
  const [connectedTo,updateConnected]=useState("0x000000000000000000000");
  const [contribution,updateContribution]=useState(0);
  const [USDContract,updateUSDContract]=useState(0);
  const [isApproved,approveUpdate]=useState(false);
  const fundAMT = createRef();
  var ABI=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"add","type":"address"}],"name":"addToWhiteList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"presaler","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"changeHasClaimed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"presaler","type":"address"}],"name":"changeHasClaimedFromContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"acc","type":"address"}],"name":"checkClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"con","type":"address"}],"name":"insertMagusAdd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhiteListed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_burnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalburnt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
  var address="0x30beBE747F0F165A8A4F0357b686D2AC7C19fDF0"
  const withWeb3 = async ()=>{
    try{
        
        await window.ethereum.request({method:"eth_requestAccounts"});
        connectedAccount = await web3.eth.getAccounts();
        var con = await new web3.eth.Contract(ABI,address);
        updateContract(con);
        var con1 = await new web3.eth.Contract(ABI,"0xc21223249CA28397B4B6541dfFaEcC539BfF0c59");
        updateUSDContract(con1);
        console.log(connectedAccount[0]);
        await updateConnected(connectedAccount[0]);
        changeOption(true);
        var contri= await con.methods.balanceOf(connectedAccount[0]).call();
        contri/=10**6;
        console.log(contri);
        updateContribution(contri);
    }
    catch(exception){
      console.log(exception);
    }

  }
  const approve = async ()=>{
    var amt = (fundAMT.current.value*10**6).toString();
    console.log(amt);
    var tx = await USDContract.methods.approve(address,amt).send({from:connectedTo});
    console.log(tx);
    approveUpdate(true);
  }
  const fund = async ()=>{

    var amt = (fundAMT.current.value*10**6).toString();
    console.log(amt);
    var tx = await contract.methods.fund(amt).send({from:connectedTo});
    console.log(tx);
    var contri= await contract.methods.balanceOf(connectedTo).call();
        contri/=10**6;
        updateContribution(contri);
        approveUpdate(false);
  }
  return (
    <div className="main-content">
      <div className="presale-welcome">
        <div className="welcome-content">
          <span id="welcome-heading-1">WELCOME TO</span>
          <span id="welcome-heading-2">MAGUS</span>
          <span id="welcome-heading-3">NODES</span>
          <span id="welcome-heading-3">PRESALE</span>
        </div>
        
          <img className="blurry-logo" src={logo} width={"25%"}/>
        
      </div>
      <div style={{padding:"3%",marginTop:"12%"}}>
        <div className="presale-tab">
          {!connected?<div className="connect-button" onClick={withWeb3}>
            Connect
          </div>:
          <p>Connected to: {connectedTo}</p>}
          <p>Minimum Contribution: $200</p>
          {connected?<p>Your Contribution: ${contribution}</p>:<></>}
          <input type="number" placeholder="Enter the amount" style={{margin:"2% 0%"}} ref={fundAMT}/>
          {!isApproved?<div className="connect-button" onClick={approve}>
            Approve
          </div>:<></>}
          <div className="connect-button" onClick={fund} style={{marginTop:"1%"}}>
            Contribute
          </div>
          <h4 style={{marginTop:"1%"}}>Steps</h4>
          <ul>
            <li>Connect your wallet</li>
            <li>Type in the amount you wish to contribute minimum is $200</li>
            <li>Press Approve and wait till the button disappears</li>
            <li>Press Contribute</li>
          </ul>
          <h4>And you are done congratulations for being an early investor in Magus Nodes!</h4>
        </div>
      </div>
      
    </div>
  );
};

export default App;
