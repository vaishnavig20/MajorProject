

import {  logging, PersistentMap} from 'near-sdk-as'


const PatientDetail=new PersistentMap<string,string>("PatientDetail");
const NamePair=new PersistentMap<string,string[]>("Name Pair");
const PatientArray= new PersistentMap<string,string[]>("array of patients ");
const userParticipation = new PersistentMap<string,string[]>('user Participation Record')






// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  

export function getDetail(name:string):string{
  if(PatientDetail.contains(name)){
    return PatientDetail.getSome(name)
  }else{
    logging.log(`can't find that user`)
    return ''
  }
}

export function didParticipate(patient:string, user:string):bool{
  if(userParticipation.contains(patient)){
    let getArray=userParticipation.getSome(patient);
    return getArray.includes(user)
  }else{
    logging.log('patient not found')
    return false
  }
}

export function getAllPatients():string[]{
  if(PatientArray.contains('AllArrays')){
    return PatientArray.getSome("AllArrays")
  }else{
    logging.log('no patients found');
    return []
  }
}




export function getNamePair(patient:string):string[]{
  if(NamePair.contains(patient)){
    return NamePair.getSome(patient)
  }else{
    logging.log('patient not found')
    return []
  }
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain

export function addDetail(name:string, Detail:string):void{
  PatientDetail.set(name,Detail);
  logging.log('added Detail for '+ name);
}

export function addNamePair(patient:string,name1:string,name2:string):void{
  NamePair.set(patient,[name1,name2])
}

export function addToPatientArray(patient:string):void{
  logging.log('added to patient array')
  if(PatientArray.contains("AllArrays")){
    logging.log('add addition to patient array')
    let tempArray=PatientArray.getSome("AllArrays")
    tempArray.push(patient)
    PatientArray.set("AllArrays",tempArray);
  }else{
    PatientArray.set("AllArrays",[patient])
  }
}

export function clearPatientArray():void{
  logging.log('clearing patient array');
  PatientArray.delete("AllArrays")
}




export function recordUser(patient:string,user:string):void{
  if(userParticipation.contains(patient)){
    let tempArray=userParticipation.getSome(patient);
    tempArray.push(user);
    userParticipation.set(patient,tempArray)
  }else{
    userParticipation.set(patient,[user]);
  }
}


