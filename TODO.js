var ToDo = (function () {
    var Container = (function() {
        var Container = function(title) {
			this.setTitle(title);
        };
        Container.prototype.setTitle = function(title) {
            this._title = title;
        };
        Container.prototype.getTitle = function() {
            return this._title;
        };
        Container.prototype.addToDom = function() {
            var divC = document.createElement("div");
            divC.id = "container";
			document.body.appendChild(divC);   
			
            var header = document.createElement("h1");
            header.innerHTML = this._title;
            divC.appendChild(header);

            var divCC = document.createElement("div");
            divCC.id = "NewSec";
            divC.appendChild(divCC);

            var input = document.createElement("input");
            input.id="newSec";
            input.type = "text";
            input.placeholder = "Add new section...";
            input.name = "SectionTitle";
            divCC.appendChild(input);


            var buttonCont = document.createElement("button");
            buttonCont.innerHTML = '&plus;';
            buttonCont.name = 'addSectionButton';
            buttonCont.id = 'addSectionButton';
            buttonCont.addEventListener("click",function(){
                addSection();
                $('#newSec').val('');
            })
            divCC.appendChild(buttonCont);

        };
        return Container;
    }());
    var Section = (function() {
            var cnt = 0;
            var Section = function(title, items) {
                this.setTitle(title);
                this.setItems(items);
                this._id = cnt;
                cnt++;
            };
            Section.prototype.setTitle = function(title) {
                this._title = title;
            };
            Section.prototype.setItems = function(items) {
                this._items = items;
            };
            Section.prototype.getTitle = function() {
                return this._title;
            };
            Section.prototype.getItems = function() {
                return this._items;
            };
            Section.prototype.addItem = function(newItem) {
                this._Item.push(newItem);
            };
            Section.prototype.addToDom = function() {
                var parentC = document.getElementById("container");
				

                var divS = document.createElement("div");
                divS.id = this._id;
                parentC.appendChild(divS);

                var header = document.createElement("h2");
                header.innerHTML = this._title;
                var icon = document.createElement("i");
                icon.className = "fa fa-bars";
                header.appendChild(icon);
                divS.appendChild(header);

                var divAddItem = document.createElement("div");
                divAddItem.id = "AddItemDiv";
				divS.appendChild(divAddItem);
				
                var inputNewItem = document.createElement("input");
                inputNewItem.id = "newItem";
                inputNewItem.type = "text";
                inputNewItem.placeholder = "Add item...";
                inputNewItem.name = "ItemTitle";
                divAddItem.appendChild(inputNewItem);
				
                var buttonItem = document.createElement("button");
                buttonItem.innerHTML = "+";
				buttonItem.name = "addItemButton";
				buttonItem.addEventListener("click", function() {
				    addItem(divS.id);
				    $('#newItem').val('');
				});
				divAddItem.appendChild(buttonItem);

            };
				
                return Section;
				
            }());
        var Item = (function() {
            var count = 0;
            var Item = function(title) {
                this.setTitle(title);
                this._id = count;
                count++;
            };
            Item.prototype.setTitle = function(title) {
                this._title = title;
            };
            Item.prototype.getTtitle = function() {
                this._items = items;
            };
            Item.prototype.addToDom = function(target) {
				var parentS = document.getElementById(target);

                var divItem = document.createElement("div");
                divItem.className="item";
                divItem.addEventListener('click', function() {
                    divItem.classList.toggle('checked');
                });
                parentS.appendChild(divItem);

                var label = document.createElement("label");
                label.innerHTML = this._title;
                label.htmlFor = this._id + "addItem";
                divItem.append(label);

                var inputItem = document.createElement("span");
                inputItem.innerHTML="\u00D7";
                inputItem.id = this._id + "addItem";
                inputItem.value = this._title;
                inputItem.addEventListener('click', function() {changeStatus(inputItem.id)});
                divItem.appendChild(inputItem);

            };

            return Item;
        }());
        return {
            Container: Container,
            Section: Section,
            Item: Item
        };
    }());

var addItem = function addItem(target) {

    var header = document.getElementsByName("ItemTitle")[0].value;
    var item = new ToDo.Item(header);
    item.addToDom(target);
};
var addSection = function addSection() {
	
    var headerS = document.getElementsByName("SectionTitle")[0].value;
    var section = new ToDo.Section(headerS);
    section.addToDom();
};
var changeStatus = function changeStatus(idItem){
	
	var selectItem = document.getElementById(idItem).parentElement;
	selectItem.classList.toggle("remove");
	
}