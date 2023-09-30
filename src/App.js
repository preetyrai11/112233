import { useState, useEffect } from "react";
import { ethers } from "ethers";
import nftMarketABI from "./contract/NFTMarket.json";
// import ErrorMessage from "./ErrorMessage";
import './App.css';

export default function App() {
  const [txs, setTxs] = useState([]);
  
  const [TokenURI, setTokenURI] = useState();
  const [TokenName, setTokenName] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [walletAddress, setWalletAddress] = useState("");


  
  
  async function main() {
    const rpc = 'ttps://chaotic-late-gadget.matic-testnet.discover.quiknode.pro/b548de45b6c7ce7de572bc485c06b2da906cb7a2/';
    const PRIVATE_KEY = `eb7dc0cf53fc72373bea061530117388f6463bba77cd7400c1d92cd4336bc4e5`;

    // const pro = new ethers.providers.JsonRpcProvider(rpc);
    // const wallet = new ethers.Wallet(PRIVATE_KEY, pro);
    const contractAddress = "0x24A550c6c90BD9776002Cb384af5fF06be459EAF";

    let provider;
   // let signer = null;
    if (window.ethereum == null) {
     //provider = ethers.getDefaultProvider()
    } else {
       //provider = new ethers.JsonRpcProvider(rpc);
      // signer = provider.getSigner();
   }
   const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

 

    const nftContract = new ethers.Contract(
        contractAddress,
        nftMarketABI,
        wallet 
    );

     setContractAddress(nftContract);
  }

  
  useEffect(() => {
    main() 
  },[]) 

   

 

  async function requestAccount() {
    console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    
    let provider;
    let signer = null;
    if (window.ethereum == null) {
     provider = ethers.getDefaultProvider()
    } else {
       provider = new ethers.BrowserProvider(window.ethereum)
       signer = provider.getSigner();
   }
  }


  

  const handleCreateNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let provider;
    let signer = null;
    if (window.ethereum == null) {
     provider = ethers.getDefaultProvider()
    } else {
       provider = new ethers.BrowserProvider(window.ethereum)
       signer = provider.getSigner();
   }
   
    const nftContract = new ethers.Contract(contractAddress, nftMarketABI, signer);
    await nftContract.createNFT(data.get("tokenURI"), data.get("tokenName"));
  }

  const handleListNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let provider;
    let signer = null;
    if (window.ethereum == null) {
     provider = ethers.getDefaultProvider()
    } else {
       provider = new ethers.BrowserProvider(window.ethereum)
       signer = provider.getSigner();
   }
   
    const signerAddress = await signer.getAddress();
    const nftContract = new ethers.Contract(contractAddress, nftMarketABI, signer);
    await nftContract.listNFT(data.get("tokenID"), data.get("price"));

   
  }


  

  const handlePurchseNFT = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let provider;
    let signer = null;
    if (window.ethereum == null) {
     provider = ethers.getDefaultProvider()
    } else {
       provider = new ethers.BrowserProvider(window.ethereum)
       signer = provider.getSigner();
   }
   
    const nftContract = new ethers.Contract(contractAddress, nftMarketABI, signer);
    await nftContract.purchaseNFT(data.get("tokenURI"), data.get("tokenName"));
  }

 

  

  

  return (
    
    
  <div className="center-align">
      <header className="button">
        <button
        
        onClick={requestAccount}
        
        >Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
      </header>
    
    <div className="centered">

    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center"> 
 
    
      <div className="w-50 bg-white rounded p-3"> 
         
         
         <div> 
          <button onClick={handlePurchseNFT}> <h1> Purchase NFT</h1></button>
         </div>

      </div>
    </div>
         <div className="w-50 bg-white rounded p-3"> 
            <form onSubmit={handleCreateNFT}> 
              <h2> Create NFT </h2>
              <div className="mb-2"> 
                <label htmlFor=""> Token URI </label>
                <input 
                  type="text" 
                  placeholder="Enter Token URI" 
                  name="tokenURI"
                  className="form-control" 
                  onChange={(e) => setTokenURI(e.target.value)}
                  />
              </div>
              <div className="mb-2"> 
                <label htmlFor="">Token Name</label>
                <input 
                 type="text" 
                 placeholder="Enter Email" 
                 name="tokenName" 
                 className="form-control"
                 onChange={(e) => setTokenName(e.target.value)} 
                 /> 
              </div>

              
              <button className="btn btn-success">Submit </button>
            </form>
         </div>
         <div className="w-50 bg-white rounded p-3"> 
            <form onSubmit={handleCreateNFT}> 
              <h2> List NFT in Market Place </h2>
              <div className="mb-2"> 
                <label htmlFor=""> Token ID </label>
                <input 
                  type="text" 
                  placeholder="Enter Token ID" 
                  name="tokenID"
                  className="form-control" 
                  onChange={(e) => setTokenURI(e.target.value)}
                  />
              </div>
              <div className="mb-2"> 
                <label htmlFor="">Token Price</label>
                <input 
                 type="text" 
                 placeholder="Enter NFT Price" 
                 name="price" 
                 className="form-control"
                 onChange={(e) => setTokenName(e.target.value)} 
                 /> 
              </div>

              
              <button className="btn btn-success">Submit </button>
            </form>
         </div>
         <div className="overflow-x-auto">
         <table className="table w-full">
           <thead>
             <tr>
               <th>NFT Id</th>
               <th>NFT Pricel</th>
              
             </tr>
           </thead>
           <tbody>
             <tr>
            
             </tr>
           </tbody>
         </table>
       </div>
      </div>
      </div>

  

 
  );
}
























  









