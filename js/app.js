'use strict';
let total=0;
let arrayOfDonors=[];
let donorForm=document.getElementById('donorForm');
let donorTable=document.getElementById('donorsTable');
// From MDN
function getRandomAge(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
// From stack overflow
function deleterow(tableID) {
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;

  table.deleteRow(rowCount -1);
}
function Donors(donorName,amount){
  this.donorName=donorName;
  this.amount=amount;
  total+=parseInt(amount);
  this.donorAge=getRandomAge(18,30);
  arrayOfDonors.push(this);
}
Donors.prototype.renderRow=function(){
  let dataRow=document.createElement('tr');
  donorTable.appendChild(dataRow);

  let tdEl=document.createElement('td');
  dataRow.appendChild(tdEl);
  tdEl.textContent=this.donorName;

  let tdEl1=document.createElement('td');
  dataRow.appendChild(tdEl1);
  tdEl1.textContent=this.donorAge;

  let tdEl2=document.createElement('td');
  dataRow.appendChild(tdEl2);
  tdEl2.textContent=this.amount;
};
function renderFooter(){
  let footerRow=document.createElement('tr');
  donorTable.appendChild(footerRow);
  let tfEl=document.createElement('td');
  footerRow.appendChild(tfEl);
  tfEl.textContent=`Total: ${total}`;
  tfEl.setAttribute('colspan','3');

}

// let d1 = new Donors('khalil',500);
// d1.renderRow();
renderFooter();

// console.log(d1);

donorForm.addEventListener('submit',handelForm);

function handelForm(event){
  deleterow('donorsTable');
  event.preventDefault();
  console.log(event);
  let newDonorName=event.target.donorName.value;
  let newAmount=event.target.amount.value;
  let newDonor=new Donors(newDonorName,newAmount);
  newDonor.renderRow();
  renderFooter();
  saveToLs();
}

function saveToLs(){
  localStorage.setItem('Donors',JSON.stringify(arrayOfDonors));
}
function getFromLs(){
  let donorData=localStorage.getItem('Donors');
  let ParseddonorData=JSON.parse(donorData);
  //   console.log(ParseddonorData);
  if(ParseddonorData){
    for(let i=0;i<ParseddonorData.length;i++){
      let reinst=new Donors(ParseddonorData[i].donorName,ParseddonorData[i].amount);
      deleterow('donorsTable');
      reinst.renderRow();
      renderFooter();
    }
    arrayOfDonors=ParseddonorData;
  }
}

getFromLs();
