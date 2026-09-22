
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu'), links=document.querySelector('.links');
 if(menu&&links){menu.addEventListener('click',()=>{const open=links.dataset.open==='1';links.dataset.open=open?'0':'1';links.style.display=open?'none':'flex';if(!open){links.style.position='absolute';links.style.top='68px';links.style.left='0';links.style.right='0';links.style.background='#fff';links.style.padding='18px 4%';links.style.flexDirection='column';links.style.alignItems='flex-start';links.style.boxShadow='0 15px 30px rgba(0,0,0,.1)'}})}
 document.querySelectorAll('[data-wa]').forEach(b=>b.addEventListener('click',()=>{const m=encodeURIComponent('Hello Ken Tank, I would like to order/enquire about '+b.dataset.wa+'.');window.open('https://wa.me/254736066663?text='+m,'_blank')}));
 document.querySelectorAll('.year').forEach(x=>x.textContent=new Date().getFullYear());
});


// Interactive payment selection
const paymentCards=document.querySelectorAll('.payment-card[data-payment]');
const paymentSelected=document.getElementById('payment-selected');
const paymentMessage=document.getElementById('payment-message');
const paymentContinue=document.getElementById('payment-continue');
const paymentMessages={
 'M-Pesa':'Send your order details to Ken Tank first so the correct M-Pesa payment instructions can be confirmed.',
 'Visa / Mastercard':'Send your order details first so card-payment availability and instructions can be confirmed.',
 'Bank Transfer / Cheque':'For business or larger orders, contact Ken Tank to confirm bank-transfer or cheque instructions.'
};
paymentCards.forEach(card=>card.addEventListener('click',()=>{
 paymentCards.forEach(c=>c.classList.remove('is-selected')); card.classList.add('is-selected');
 const method=card.dataset.payment;
 paymentSelected.textContent=method+' selected';
 paymentMessage.textContent=paymentMessages[method]||'Contact Ken Tank to confirm payment instructions.';
 paymentContinue.href='https://wa.me/254736066663?text='+encodeURIComponent('Hello Ken Tank, I want to place an order and pay via '+method+'. Please send me the correct payment instructions.');
}));

// Responsive testimonial carousel: three cards on desktop, two on tablet, one on mobile.
const track=document.getElementById('testimonial-track');
const reviewItems=track?Array.from(track.querySelectorAll('.testimonial')):[];
const dotsWrap=document.querySelector('.review-dots');
const prev=document.querySelector('.review-nav.prev');
const next=document.querySelector('.review-nav.next');
let reviewPage=0;
function reviewPerPage(){return window.innerWidth<=700?1:(window.innerWidth<=1000?2:3)}
function renderReviews(){
 if(!track||!reviewItems.length)return;
 const per=reviewPerPage(), pages=Math.ceil(reviewItems.length/per);
 reviewPage=Math.min(reviewPage,pages-1);
 reviewItems.forEach((item,i)=>{item.style.display=(Math.floor(i/per)===reviewPage)?'block':'none'});
 if(dotsWrap){dotsWrap.innerHTML=''; for(let i=0;i<pages;i++){const b=document.createElement('button');b.className='review-dot'+(i===reviewPage?' is-active':'');b.type='button';b.setAttribute('aria-label','Show testimonial group '+(i+1));b.addEventListener('click',()=>{reviewPage=i;renderReviews()});dotsWrap.appendChild(b)}}
}
prev?.addEventListener('click',()=>{const pages=Math.ceil(reviewItems.length/reviewPerPage());reviewPage=(reviewPage-1+pages)%pages;renderReviews()});
next?.addEventListener('click',()=>{const pages=Math.ceil(reviewItems.length/reviewPerPage());reviewPage=(reviewPage+1)%pages;renderReviews()});
window.addEventListener('resize',renderReviews);renderReviews();

document.querySelectorAll('.review-more').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.testimonial');card.classList.toggle('expanded');btn.textContent=card.classList.contains('expanded')?'Show less':'Read review';}));
