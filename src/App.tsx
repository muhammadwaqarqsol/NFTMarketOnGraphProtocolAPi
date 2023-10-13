import { Navbar } from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import MintNft from "./components/pages/MintNft";
import { MyNfts } from "./components/pages/MyNfts";
import { MainPage } from "./components/pages/mainPage";
import { NftListing } from "./components/pages/NftListing";
import { TransferNFTs } from "./components/pages/Transfers";
import { BoughtNFTs } from "./components/pages/Bought";
import { SoldNFTs } from "./components/pages/Sold";
import { MarketPlaceBuy } from "./components/pages/MarketPlaceBuy";
function App() {
  return (
    <>
      <head>
        <title>NFTrops</title>
      </head>
      <div className="relative min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/MintNft" element={<MintNft />}></Route>
          <Route path="/MyNfts" element={<MyNfts />}></Route>
          <Route path="/ListedNfts" element={<NftListing />}></Route>
          <Route path="/RecentTransfers" element={<TransferNFTs />}></Route>
          <Route path="/BoughtNFTs" element={<BoughtNFTs />}></Route>
          <Route path="/SoldNFTs" element={<SoldNFTs />}></Route>
          <Route path="/market" element={<MarketPlaceBuy />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
