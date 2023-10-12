export function FETCH_CREATED_NFT(address: any) {
  return `query {
  tokens(where:{
    owner:"${address}"
    Listed:false
  }) {
    tokenID
    Name
    Description
    ImageUrl
    Listed
  }
} `;
}

export function FETCH_Listed_NFT(address: any) {
  return `query {
  tokens(where:{
    owner:"${address}"
    Listed:true
  }) {
    tokenID
    Name
    Description
    ImageUrl
    Listed
    price
  }
} `;
}

export function FETCH_Bought_NFT(number: any) {
  return `query{
   boughtNFTs(first:${number}) {
    _from
    _to
    id
    price
    tokenUri
    tokenid
  }`;
}

export function FETCH_RECENT_Transfer(address: any) {
  return `query {
  transfers(where:{
    from:"${address}"
  }) {
    tokenId
    Name
    Description
    ImageUrl
  }
}`;
}
