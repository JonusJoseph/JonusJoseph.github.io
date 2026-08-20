const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
$$(".reveal").forEach(el=>observer.observe(el));
// Safety net: if anything (slow devices, missed events, edge-case timing) leaves reveal
// elements stuck invisible, force them visible after 2.5s so content is never lost.
setTimeout(()=>$$(".reveal:not(.visible)").forEach(el=>el.classList.add("visible")),2500);

$("#menuBtn").addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile-open"));

/* Skill universe: covers the supplied skills table plus the AI/platform skills in the CV. */
const skills={
"Cloud":[
["AWS","aws"],["GCP","googlecloud"],["Azure","microsoftazure"],["SAP BTP","sap"],["SAP Converge Cloud","sap"],["SAP S/4HANA","sap"],["SuccessFactors","sap"],["Ariba","sap"],["Concur","sap"],["Fieldglass","sap"],["Datasphere","sap"],["OpenStack","openstack"]
],
"Containers / Platform":[
["Kubernetes","kubernetes"],["Docker","docker"],["Docker Swarm","docker"],["SAP Gardener","sap"],["Argo CD","argocd"]
],
"CI/CD & IaC":[
["Jenkins","jenkins"],["GitHub Actions","githubactions"],["Ansible","ansible"],["Terraform","terraform"],["Git","git"]
],
"Observability":[
["Prometheus","prometheus"],["Grafana","grafana"],["Loki","grafana"],["OpenTelemetry","opentelemetry"],["ELK / Elastic","elastic"],["Splunk","splunk"],["Nagios","nagios"],["Zabbix","zabbix"]
],
"Programming":[
["Python","python"],["Bash","gnubash"],["Perl","perl"],["PHP","php"],["Go","go"],["JavaScript","javascript"]
],
"Systems / OS":[
["Linux","linux"],["RHEL / Red Hat","redhat"],["CentOS","centos"],["SUSE","suse"],["Ubuntu","ubuntu"],["Debian","debian"]
],
"Virtualization":[
["VMware ESXi","vmware"],["vCenter","vmware"],["KVM","qemu"]
],
"Networking":[
["Router","user:router"],["Switch","user:switch"],["Hub","user:hub"],["Bridge","user:bridge"],["Repeater","user:repeater"],["Gateway","user:gateway"],["Modem","user:modem"],["Wireless Access Point (AP)","user:wireless-ap"],["Wireless Controller (WLC)","user:wlc"],["Firewall","user:firewall"],["Load Balancer","user:load-balancer"],["Proxy Server","user:proxy-server"],["VPN Gateway","user:vpn-gateway"],["IDS","user:ids"],["IPS","user:ips"],["NAT Gateway","user:nat-gateway"],["DHCP Server","user:dhcp-server"],["DNS Server","user:dns-server"],["Bastion Host","user:bastion-host"],["Network TAP",""],["WAN Optimizer",""],["SD-WAN Appliance",""],["Layer-3 Switch",""],["Reverse Proxy","user:reverse-proxy"],["API Gateway","user:api-gateway"],["Cloud VPC","user:cloud-vpc"],["Cloud VNet","user:cloud-vnet"]
],
"Integration":[
["REST API",""],["SDK",""],["JSON","json"],["YAML","yaml"],["XML",""],["SNMP",""],["SSH",""],["Syslog",""],["OData",""]
],
"Data / Messaging":[
["MySQL","mysql"],["PostgreSQL","postgresql"],["Oracle","oracle"],["MongoDB","mongodb"],["Kafka","apachekafka"],["Redis","redis"],["Memcached","memcached"],["SAP HANA","sap"]
],
"Web / Full Stack":[
["HTML","html5"],["CSS","css3"],["JavaScript","javascript"],["PHP","php"],["Django","django"],["Flask","flask"],["LAMP",""],["Web APIs",""],["FastAPI",""]
],
"Storage / Backup":[
["NFS",""],["Samba","samba"],["FTP","filezilla"],["SAN",""],["RAID",""],["LVM","linux"],["EXT4","linux"],["XFS","linux"],["Rsync",""],["Bacula",""]
],
"SAP":[
["SAP S/4HANA","sap"],["SAP BTP","sap"],["FRUN","sap"],["Cloud Connector","sap"],["Web Dispatcher","sap"],["NetWeaver","sap"],["SAP Converge Cloud","sap"],["Cloud ALM","sap"],["ABAP","sap"]
],
"AI / ML":[
["NumPy","numpy"],["Pandas","pandas"],["OpenCV","opencv"],["Matplotlib","matplotlib"],["Seaborn",""],["PyTorch","pytorch"],["TensorFlow","tensorflow"],["scikit-learn","scikitlearn"],["Hugging Face","huggingface"],["LangChain","langchain"],["LangGraph","langgraph"],["Machine Learning","user:machine-learning"],["DSA","user:dsa"],["Neural Networks","user:neural-network"],["Deep Learning","user:deep-learning"],["Deep Learning — Advanced","user:deep-learning-2"],["Generative AI","user:generative-ai"],["Agentic AI","user:agentic-ai"],["LLMs","user:llms"],["SLMs",""],["RAG","user:rag"],["Vector Databases","user:vector-database"],["Chroma","user:chroma"],["pgvector","postgresql"],["AI/ML Observability","user:ai-ml-observability"],["Model Serving",""],["Model Monitoring",""],["MCP Server","modelcontextprotocol"]
],
"Computer Science Foundations":[
["Data Structures & Algorithms",""],["DSA Problem Solving",""],["Machine Learning",""],["Algorithms & Complexity",""],["Python Fundamentals","python"]
],
"Security & Enterprise Automation":[
["Python Automation","python"],["Ansible / AWX","ansible"],["Terraform","terraform"],["JIRA","jira"],["ServiceNow","servicenow"],["IBM QRadar","ibm"],["IBM Resilient","ibm"],["IBM XGS","ibm"],["Nagios XI","nagios"],["Security Hardening",""],["REST / SDK Integration",""]
]
};

const slugAliases={googlecloud:"googlecloud",githubactions:"githubactions",apachekafka:"apachekafka",modelcontextprotocol:"modelcontextprotocol"};

// User-supplied product / technology logos. These override the generic Simple Icons lookup.
const customIcons={
  "FastAPI":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDkKlU-Zr_J1Rj9Vlh0-2gO0PyS8-OKnrNxtYXtKAlw&s=10",
  "OData":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsPS9v3okofmg6a6UJT1eZY9gg1Lzam9fz9dNYOIjD3Q&s=10",
  "AWS":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd9ep2rTs5DJ1yh7xeY92Zw8ireBYy5BuJnOYoXqnvoQ&s=10",
  "Azure":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCV_Fg-XL5gzS9Bc4ID1nmMMLo89bU0_7V4n2sgp-RYQ&s=10",
  "Model Serving":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1su70vSWayKPG_BQp0g7grOuWrPt6ZaPcRABwe9RBxw&s=10",
  "MCP Server":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9JdoJfAHkenBMkO5AcLgSgP6vV6Q011clKrpp6nRoA&s=10",
  "Data Structures & Algorithms":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS76WGzta0oL1zt1hhyGy_gBF_b0X8_fsJIHGh11C41u2c17Qef4M2EKHSD&s=10",
  "DSA Problem Solving":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiBwqrBInMC4dZNTP0IhS3c16P2H9hfuF7hKINe1_QXQ&s=10",
  "Algorithms & Complexity":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNf6pkkUVPz2bVUy6BatkFabE47vNExkl0Sq-pT8JgZQ&s=10",
  "Machine Learning":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxcvHUnHyB2p5PFKEo0kntaawo_KBQeQ9_TzmFbQ7_jVEy1zn4zOWyzNih&s=10",
  "Security Hardening":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF4uDqwhaAeA9mMguq4y5NifMQ_44cv5wdkNbwoGJMvg&s=10",
  "REST / SDK Integration":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNp2enGvfE0degLI-PZbZWM9FzXtmam23owW9XuYKXIn0CvHUyMX4GAUCE&s=10",
  "NFS":"https://cdn.simpleicons.org/linux",
  "Samba":"https://cdn.simpleicons.org/linux",
  "RAID":"https://cdn.simpleicons.org/linux",
  "SAN":"https://cdn.simpleicons.org/linux",
  "Bacula":"https://cdn.simpleicons.org/linux",
  "Rsync":"https://cdn.simpleicons.org/linux",
  "LAMP":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLeRCtZifGRL7_jMm3nAL6zMnYP0n-G1TEwuMA2XAZZQ&s=10",
  "Web APIs":"https://krify.com/wp-content/uploads/2021/02/web-api.png",
  "CSS":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRZZb_t-jO4w-k1hKkLO5esuYM_HDOilnhoCUIbBB5LQ&s=10",
  "REST API":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP2HIg3Yyqjr-ZqahEtUaGQ1B9CRQYw1DpU88RiPmyvA&s=10",
  "SDK":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQejodS37z29ELbKure4P9OxQ6plZ0znVH-8HQ--Qa5zg&s",
  "JSON":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWYG0e53ZHF4gD4146bSFbHw7VsNi_P0QqAcvpiSJ8Jw&s=10",
  "XML":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXQKXYnQ-EWMGe5juq_v4rDTpu4mdi5TgGje3vTvU5u30MeBXcBagwiMx&s=10",
  "SNMP":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSb69KYtffPIAEqT8oYD2zfICEksjS4ta0F-YR98RpqA&s=10",
  "SSH":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQU3UFZMq38BbroLg9EvMz7OvYleGmjUrUdGNRHsJDwg&s=10",
  "Syslog":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUiaycjVUgCE8GatmAucDVtgpOQWSd3jlk16hDz3EKw&s=10",
  "Layer-3 Switch":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKWse_U_vbBtn7QjVOnUNZ6ei1i8ed99icsjB18YhLF3wNirUuw_UiTac&s=10",
  "WAN Optimizer":"https://e7.pngegg.com/pngimages/580/249/png-clipart-wan-optimization-computer-icons-computer-network-mathematical-optimization-network-performance-symbol-miscellaneous-computer-network.png",
  "SD-WAN Appliance":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJ_VMvotl-Ymb29utZlMptMcsaIzlzI-dxdjdTlI6JA&s=10",
  "Argo CD":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNOZf8xfxs3SHZJ-AY-A_sgbGoZ1ikfskB8YGxkG-wzA&s=10",
  "Nagios":"https://www.altnix.com/_next/static/media/Nagios.54ad1301.png",
  "Zabbix":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKmCMu1gTrAQ6_QqxmttRx2L2l6euvsUKoQSYs2k45nw&s=10",
  "OpenTelemetry":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHzkbnd2EWhRwDMDy236orxZn3wVi2RUGzuVYt28GFA&s=10",
  "Splunk":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwwZFFxiPwG-Kn82tZ1XbGlmKwdvi00XKnjhIq7M4YrQ&s=10",
  "ServiceNow":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeBN7Ct5-N_TM5dBliWPT_eOtrZwueixBLqiuu34zelQ&s=10",
  "Nagios XI":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoLS4o6rEojZLW1WBSooP-OtI3yrNNcN4GmJKPEOWG5A&s=10",
  "IBM Resilient":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSasNPYQuG1qQdLUfD15ryk10Kg981pRDrE7ITv9Lnyvw&s=10",
  "IBM QRadar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSasNPYQuG1qQdLUfD15ryk10Kg981pRDrE7ITv9Lnyvw&s=10",
  "IBM XGS":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSasNPYQuG1qQdLUfD15ryk10Kg981pRDrE7ITv9Lnyvw&s=10"
};
const userIcons={
"user:rhce7":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVgq08jde4N_Q5uwfnIhfnhTocqF0sVatJu-roBTPG2fQ1xp1n5Z56g&s=10",
"user:itil-v3":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnwpGaznz7XzTrfiRbL3VM2TzjqIGLjikM9lkBf12EQ&s=10",
"user:python":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTELkjRKw1H5QnFNC_6os53v9pTnn5MMh9Jsmp1CWG6mg&s=10",
"user:go":"https://limmat.fun/images/golang_logo.jpg",
"user:sap-hana":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ifGchXJv_aucSJbvwDlgX8eaHKqnuuyGucsCY5fTA7hMSEFrJb4Mehg&s=10",
"user:ibm-db2":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaujfakjxnhBHfTn8rnr-rq-Uz-8Pv_rJACTa88zPzJF1nGKorSHi-QgEA&s=10",
"user:ibm-tivoli":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReyF9O2OtAu2rJ1LterjzhRCTRPQFWA_YxQHl-h4lDyQ&s=10",
"user:machine-learning":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvrUkQsV9XqxDjAsgukerr7K6_Jq40bLRIRxP9HF4fw&s",
"user:deep-learning":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAa1-Yp2dT0U2XzudRzDBU2nzo3ddBtn37u98KLyIb5Q&s",
"user:neural-network":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfgaq5ef62YfYKxyBeE-7_LHJ8sL2C7vngHO0abUaQUQ&s=10",
"user:deep-learning-2":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTspeCcMOtgUMjCVhmhn4aYyshXKj9-QXtukAPdQsIJdg&s=10",
"user:generative-ai":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm3Zu2Ho7xi7GiaUqhCte28NrulYWkjRZlc_b4MyAQog&s=10",
"user:agentic-ai":"https://media.licdn.com/dms/image/v2/D4E12AQGE7xOCTscSVg/article-cover_image-shrink_600_2000/B4EZq4V6BnIoAQ-/0/1764029344357?e=2147483647&v=beta&t=pH9WPJ3N76GUEyHITQs5hQ4YbQTUOaPZc50LgfgNi6M",
"user:llms":"https://miro.medium.com/v2/1*HGUGA_Y5hU4g4GvgdnYPTg.png",
"user:rag":"https://brbtutpyooqytvxkzudb.supabase.co/storage/v1/object/public/blog-images/connaissez-vous-le-rag-en-ia.png",
"user:vector-database":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC1zaPhjH_UCyJngS2FGkOvTlBG8d0qaHdKdqBWeQm1Q&s=10",
"user:chroma":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPpNtUTsFRrgSrQr7KayfSZX1RW86ecnXhNi44Y8Qn8w&s=10",
"user:ai-ml-observability":"https://miro.medium.com/v2/resize:fit:1400/1*dcOneuWuO1BKKE5zWFxR2g.png",
"user:dsa":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVsLQitgJEJtY4Do00X8TNoUyQ5lPg3eh2xXyrPEVqwbWe7XwqI7zcByc&s=10",
"user:router":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdXkOx5Cawc9kcV5kyv0ZHq8q07V1jK4dbLZyZlx-eAUQ65gAD0hG0WJY&s=10",
"user:switch":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihTuggJlFwNCfex3KU5nMuiyHNYd6SrAt_yythrqPyQ&s=10",
"user:hub":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-xP--ahU57Nv_JdOJ5HOGi3ZYRzUC6Boyzd2DRwv6DQ&s=10",
"user:bridge":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeewkHbWX_XBOdIdCgflmARRiNrW69_ECfqh-UKW9HxA&s=10",
"user:repeater":"https://symbols.getvecta.com/stencil_240/200_repeater.9c1ed4f0ef.jpg",
"user:gateway":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-HhsR4QcuTB59ybvKFlG7JnT_CQ5kjIJmqdeUhYvPBZDcEK2KJj7JrqVJ&s=10",
"user:modem":"https://symbols.getvecta.com/stencil_240/154_modem.d911e8ac07.jpg",
"user:wireless-ap":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiTr_6bbDjfaxCDiQJTJdpT968PGkGxTbsZxCVDIqmqERLSz7vXUInNP-k&s=10",
"user:wlc":"https://symbols.getvecta.com/stencil_240/277_wlan-controller.9628bcdb7d.jpg",
"user:firewall":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_SQ2auQLEiGzXXiYgoeHcRvyUe57-JTp1J4L0tni9Fg&s=10",
"user:load-balancer":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnFIaVN8GYAUOIxeaKiEwUMQbv_HfnWS8vAFJx3VEKoX6dLtjqomQIRDvR&s=10",
"user:proxy-server":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4nsTehX-6hYIaFiUC7HN0rAjLq8itnY7qlKSHm6AutA&s=10",
"user:vpn-gateway":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMTwhVc_XHIwJEPb4hv2pwLB6TAhoHTcYSmdnZYJW8VWWYZzb_soS6wkk&s=10",
"user:ids":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3HJnoZHZC6y6k4Tn6SdkRkSaKAaBpqbYSB46i0C6QA&s=10",
"user:ips":"https://i.ytimg.com/vi/EJ7inytlS7M/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBFiBl8mwUkYyZSmtEzDIu-G2EuIQ",
"user:nat-gateway":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwqaEcSYnsv_xo_bsbuZanLt2eVOmW-xUWg0Bfs_8Rqb8heaRbpLQEmyAT&s=10",
"user:dhcp-server":"https://andysowards.com/blog/assets/DHCP-Port-how-it-works-geek-tech-business-security.png",
"user:dns-server":"https://media.geeksforgeeks.org/wp-content/uploads/20250801171021517035/address_resolution_in_dns.webp",
"user:bastion-host":"https://miro.medium.com/v2/resize:fit:1400/1*OErcnrcIKne3YhR85R8c_Q.png",
"user:reverse-proxy":"https://thecustomizewindows.cachefly.net/wp-content/uploads/2024/10/What-Is-a-Reverse-Web-Proxy-and-What-Are-the-Risks-of-Using-One.png",
"user:api-gateway":"https://www.prolim.com/wp-content/uploads/2019/09/amazon-api-gatewat-1.jpg",
"user:cloud-vpc":"https://media.licdn.com/dms/image/v2/D4E12AQEIaqLAEac5Lg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721170266596?e=2147483647&v=beta&t=Z2leWQsA5i4L8s2gmMAkMVkbtGSmjrbPtPwtkmo2ghk",
"user:cloud-vnet":"https://aidanfinn.com/wp-content/uploads/2015/10/Azure-Virtual-Network.png"
};
const iconUrl=slug=>userIcons[slug] || "https://cdn.simpleicons.org/"+(slugAliases[slug]||slug);

const matrix=$("#skillMatrix"), filters=$("#skillFilters");
const allCats=["All",...Object.keys(skills)];
allCats.forEach((cat,i)=>{
  const b=document.createElement("button"); b.className="filter"+(i===0?" active":""); b.textContent=cat; b.dataset.cat=cat;
  b.onclick=()=>{ $$(".filter").forEach(x=>x.classList.remove("active")); b.classList.add("active"); renderSkills(cat); };
  filters.appendChild(b);
});

function initials(name){return name.split(/[\s/]+/).filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function skillCard(name,slug){
  const item=document.createElement("div"); item.className="skill-item";
  const src=customIcons[name] || (slug ? iconUrl(slug) : "");
  if(src){
    const img=document.createElement("img"); img.className="skill-logo"; img.alt=name; img.loading="lazy"; img.src=src;
    img.onerror=()=>{img.remove();const f=document.createElement("span");f.className="skill-fallback";f.textContent=initials(name);item.prepend(f)};
    item.appendChild(img);
  }else{
    const f=document.createElement("span");f.className="skill-fallback";f.textContent=initials(name);item.appendChild(f);
  }
  const s=document.createElement("span");s.className="skill-name";s.textContent=name;item.appendChild(s);return item;
}
function renderSkills(category="All"){
  matrix.innerHTML="";
  Object.entries(skills).filter(([cat])=>category==="All"||cat===category).forEach(([cat,items])=>{
    const group=document.createElement("section");group.className="skill-group";
    group.innerHTML=`<div class="skill-group-head"><h3>${cat}</h3><span>${items.length} SKILLS</span></div><div class="skill-items"></div>`;
    const list=group.querySelector(".skill-items");items.forEach(([name,slug])=>list.appendChild(skillCard(name,slug)));matrix.appendChild(group);
  });
}
renderSkills();

const answers={
"What does Jonus specialize in?":"Jonus is a Senior AI Development Engineer focused on AI/ML, Generative AI, LLM/SLM, RAG, AI agents, MCP, cloud, Kubernetes, observability, automation, networking, security and SAP.",
"Tell me about his AI experience.":"His AI focus includes Generative AI, LLM/SLM architecture, RAG, Agentic AI, AI agents, model serving, AI application architecture, AI observability and AI-enabled enterprise workflows.",
"What technologies does he know?":"The portfolio covers the supplied full stack: cloud, Kubernetes, Docker, CI/CD, IaC, observability, programming, Linux, virtualization, networking, integration, data/messaging, web/full stack, storage/backup, SAP, AI/ML and enterprise security automation.",
"Show me his career journey.":"Jonus worked at EFI, IPsoft, Tricoresolution/Rackspace and IBM before joining SAP Labs India in 2018, where he is currently a Senior AI Development Engineer with an AI/cloud/platform focus.",
"What was his role in EFI?":"Jonus worked at EFI as Intern Application Developer: Contributed to the development of secure enterprise applications, including a Unix-based file-transfer solution and a web-based infrastructure asset reporting and search platform, leveraging LAMP technologies. <a href=\"https://en.wikipedia.org/wiki/Electronics_for_Imaging\" target=\"_blank\"> EFI </a>",
"What was his role in IPsoft?":"Jonus worked at IPsoft as Service Transition Engineer: Delivered customer-focused infrastructure automation and integration solutions across servers, networks, VMware, and monitoring platforms using Perl, Bash, APIs, and enterprise protocols.  <a href=\"https://en.wikipedia.org/wiki/Amelia_(company)\" target=\"_blank\"> IPsoft </a>",
"What was his role in Rackspace?":"Jonus worked at Rackspace as System Engineer: Managed and automated data centers operations across the globe using enterprise Linux Servers {Dell, HP, IBM, Fujitsu, Cisco}, VMware & KVM Virtualization, Storage & Backup{SAN, NAS, Object Storage, Bacula}, Cisco Networking, on-premises Cloud OpenStack, Automation & Scripting {Ansible, Bash, Python, Perl} , Observability {Nagios, Zabbix, Splunk} , and integration technologies {API, SDK, SSH,SNMP, IPMI, Syslog}. <a href=\"https://en.wikipedia.org/wiki/Rackspace_Technology\" target=\"_blank\"> Rackspace </a>",
"What was his role in IBM?":"Jonus worked at IBM as System Security Engineer: Designed and automated IBM France datacenters security operations for a French multinational Client (Schneider Electric) with enterprise infrastructure using AWS, VMware, Linux/Windows, Ansible, Python, Bash, IBM XGS, IBM QRadar, IBM Resilient, Nagios-XI, JIRA, and integration technologies including REST APIs, SDKs, SSH, SNMP, WinRM, and network diagnostic tools, with a focus on SIEM observability integration, high availability, security hardening, and pre-production security assessments.  <a href=\"https://en.wikipedia.org/wiki/IBM\" target=\"_blank\"> IBM </a>",
"What is his role in SAP?":"Jonus working at SAP as Senior AI Development Engineer: Designed and engineered AI-enabled enterprise SAP infrastructure, application development & deployment, observability, self-healing solutions across AWS, Azure, GCP, SAP S/4HANA, SAP BTP, SAP Gardener, Kubernetes, Docker, and SAP private cloud using Python, Bash, Ansible/AWX, Terraform, Jenkins, GitHub Actions, Argo CD, Prometheus, Grafana, OpenTelemetry, ELK, Splunk, and Kafka. Integrated SAP AI Joule, SAP AI DARA, GitHub Copilot, Claude with OpenClaw Dispatch Mode, Agentic AI with LangGraph, ElevenLabs Voice Agents, Zapier Business Agents, n8n workflow automation, and Langflow for building and deploying AI Agents & MCP Servers for intelligent analysis, automated decision-making, proactive remediation, and increasingly autonomous operations. Enhanced SAP applications with AI capabilities using NumPy, Pandas, Matplotlib, and OpenCV, while integrating enterprise workflows with 3rd party application ServiceNow and JIRA.  <a href=\"https://en.wikipedia.org/wiki/SAP\" target=\"_blank\"> SAP </a>"
};
const fab=$("#assistantFab"),assistant=$("#assistant");
fab.onclick=()=>assistant.classList.toggle("open");$("#closeAssistant").onclick=()=>assistant.classList.remove("open");
function escapeHtml(s){
 const d=document.createElement("div");d.textContent=s;return d.innerHTML;
}
function linkify(s){
 return escapeHtml(s).replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}
function ask(q){
 const chat=$("#chat"),u=document.createElement("div");u.className="msg user";u.textContent=q;chat.appendChild(u);
 const b=document.createElement("div");b.className="msg bot";b.innerHTML=answers[q]||"I can answer questions about Jonus's AI, cloud, Kubernetes, observability, SAP, security, career history and technology stack.";chat.appendChild(b);chat.scrollTop=chat.scrollHeight;
}
$$(".suggestions button").forEach(b=>b.onclick=()=>ask(b.dataset.q));
$("#send").onclick=()=>{const i=$("#question"),q=i.value.trim();if(q){ask(q);i.value=""}};
$("#question").addEventListener("keydown",e=>{if(e.key==="Enter")$("#send").click()});
