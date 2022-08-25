const form = document.querySelector("#form");
const button = document.querySelector("#button");
const formTitle = document.querySelector("#input_title");
const formContent = document.querySelector("#input_content");
console.log(formTitle.length);
let records = [];

const checking = () => {
    console.log(formTitle.value.length);
    if (formTitle.value.length > 0 && formContent.value.length > 0) {
        button.removeAttribute("disabled");
    } else {
        button.setAttribute("disabled", "disabled");
    }
};

let recordSave = (id) => {
    const buttonSave = document.querySelector(`#recordButtonSave${id}`);
    const buttonInsert = document.querySelector(`#recordButtonDone${id}`);
    const wrapper = document.querySelector(`#edit_wrapper${id}`);
    const title = document.querySelector(`#edit_input_title${id}`);
    const content = document.querySelector(`#edit_input_content${id}`);
    const record = document.querySelector(`#record${id}`);
    const titleInner = title.value;
    const contentInner = content.value;

    wrapper.remove();

    records.forEach((record) => {
        if (record.counter === id) {
            let count = records.indexOf(record);
            records[count].title = titleInner;
            records[count].content = contentInner;
        }
    });

    let saveChanges = document.createElement("div");
    let createButton = document.createElement("button");
    saveChanges.innerHTML = `<div class="recordtitle" id=recordtitle${id}>${titleInner}</div>
         <div class="recordcontent" id=recordcontent${id}>${contentInner}</div>`;
    saveChanges.setAttribute("id", `titlecontentWrapper${id}`);
    createButton.setAttribute("id", `recordButtonEdit${id}`);
    createButton.setAttribute("class", `recordButton`);
    record.insertBefore(createButton, buttonInsert);
    record.insertBefore(saveChanges, createButton);
    buttonSave.remove();
    console.log(records);
};

let recordDeleteElement = (id) => {
    const record = document.querySelector(`#record${id}`);
    records.forEach((record) => {
        if (record.counter === id) {
            let count = records.indexOf(record);
            records.splice(count, 1);
        }
    });
    record.remove();
    console.log(records);
};

let recordlist = (id) => {
    const button = document.querySelector(`#recordButtonEdit${id}`);
    const wrapper = document.querySelector(`#titlecontentWrapper${id}`);
    const title = document.querySelector(`#recordtitle${id}`);
    const content = document.querySelector(`#recordcontent${id}`);
    const record = document.querySelector(`#record${id}`);

    if (title !== null && wrapper !== null) {
        const titleInner = title.innerHTML.strike();
        const contentInner = content.innerHTML.strike();
        wrapper.remove();

        let recordStrike = document.createElement("div");
        recordStrike.innerHTML = `<div class="recordtitle" id=recordtitle${id}>${titleInner}</div>
                               <div class="recordcontent" id=recordcontent${id}>${contentInner}</div>`;
        recordStrike.setAttribute("id", `recordStrikeWrapper${id}`);
        records.forEach((record) => {
            if (record.counter === id) {
                let count = records.indexOf(record);
                records[count].done = true;
            }
        });
        record.insertBefore(recordStrike, button);
    }
};

let getInputs = () => {
    const title = document.querySelector("#input_title");
    const content = document.querySelector("#input_content");
    const footer = document.querySelector("#footer");

    let recordObj = {
        title: title.value,
        content: content.value,
        done: false,
        counter: 0,
    };

    if (records.length === 0) {
        recordObj.counter = 0;
    } else {
        recordObj.counter = records[records.length - 1].counter + 1;
    }

    let newrecord = document.createElement("div");
    newrecord.setAttribute("class", "record");
    newrecord.innerHTML = `<div id="titlecontentWrapper${recordObj.counter}">
            <div class="recordtitle" id=recordtitle${recordObj.counter}>${recordObj.title}</div>
            <div class="recordcontent" id=recordcontent${recordObj.counter}>${recordObj.content}</div>
         </div>
         <button class="recordButton" id="recordButtonDone${recordObj.counter}" onclick="recordlist(${recordObj.counter})">completed</button>
         <button class="recordButton" id="recordButtonDelete${recordObj.counter}" onclick="recordDeleteElement(${recordObj.counter})">delete</button>`;
    newrecord.setAttribute("id", `record${recordObj.counter}`);
    document.body.insertBefore(newrecord, footer);
    records.push(recordObj);
    console.log(footer);
};

button.addEventListener("click", getInputs);
form.addEventListener("input", checking);
