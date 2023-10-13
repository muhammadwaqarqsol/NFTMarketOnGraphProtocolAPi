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

export function FETCH_ALL_Listed_NFT(address: any) {
  return `query {
  tokens(where:{
    Listed:true
  }) {
    tokenID
    Name
    Description
    ImageUrl
    Listed
    price
    owner{id}
  }
} `;
}
export function FETCH_transfer_NFT(address: any) {
  return `{
  transfers(where: {from:"${address}"}) {
    from
    to
    tokenId
		Name
    Description
    ImageUrl
    blockTimestamp
  }
}`;
}

export function FETCH_RECENT_BUY(address: any) {
  return `query {
  buys(where:{to:"${address}"}){
    id
    tokenId
    price
    Description
    ImageUrl
    Name
    to
    from
  }
}`;
}

export function FETCH_RECENT_SOLD(address: any) {
  return `query {
  buys(where:{from:"${address}"}){
    id
    tokenId
    price
    Description
    ImageUrl
    Name
    to
    from
  }
}`;
}
