/*
	EN:
		This script is created by Septim Xia, the purpose is for establishing an automatic localization solution for 
		AE project that requires to render multiple version on different languages,in order to boost the production and reduce risk of exporting incidents.
		If you had any issue, please contact septim.siah@gmail.com	
	CN:
		此脚本由Septim Xia创作，目的是建立适用于需要输出多语言多版本的AE项目的，一键生成式localization策略，以期提升效率并减少可能发生的输出意外。
		如果遇到了任何问题，请联络septim.siah@gmail.com
	
	Version 0.0.2:
		Adding function to create "text controller" comp, 
		Making functions to identify wheter there are an existed "text controller" comp or not.

	Version 0.0.1:
		Initiating project, create a basic UI layout upon template that provides by AE
*/

(function SepLocalization (thisObj)
{
	//PROJECT PANEL ITEMS

	var proj = app.project;

	var NAME_TextControll = "Sep_TextController";
	var NAME_LocalizationLayer="Sep_Localization";
	var NAME_Folder="Sep_MasterFolder";

	var currentTextControllerComp;
	var currentLocalizationLayer;
	var currentMasterFolder;

	//COMP ITEMS

	var PROPERTY_NAME_DropdownMenu = "Localization";
	var PROPERTY_DropdownMenu;


	//BUILD UI
	function buildUI(thisObj)
	{
		//Define UI contents
		var windowTitle = localize("$$$/AE/Script/SepLocalization/SepAutomaticLocalization=Sep Automaic Localization");
		var firstButton = localize("$$$/AE/Script/SepLocalization/CreateTextController=Create Text Controller");
		var secondButton = localize("$$$/AE/Script/SepLocalization/CreateNewText=Create New Text");
		var thirdButton = localize("$$$/AE/Script/SepLocalization/LinkCurrentText=Link Current Text");
		var forthButton = localize("$$$/AE/Script/SepLocalization/SearchTextLayer=Search Text Layer");

		//Set panel layout
		var win = (thisObj instanceof Panel)? thisObj :new Window('palette',windowTitle);
			win.spacing = 0;
			win.margins = 4;

		var myButtonGroup = win.add("group");
			myButtonGroup.spacing = 4;
			myButtonGroup.margins = 0;
			myButtonGroup.orientation = "row";

		win.button1 = myButtonGroup.add ("button", undefined, firstButton);
		win.button2 = myButtonGroup.add ("button", undefined, secondButton);
		win.button3 = myButtonGroup.add ("button",undefined,thirdButton);
		win.button4 = myButtonGroup.add ("button",undefined,forthButton);

		//create a comp to be text controller, localization are also in it
		//用来创建text controller，localization也会在这个comp里面
		win.button1.onClick = function()
		{
			CreateTextController();
		}

		//create a new layer with text component, connect to text controller by creating another text layer on it
		//用来在本comp内新建一个text，同时自动在已有的text controller里面创建一个相同的Text并关联上
		win.button2.onClick = function()
		{
			CreateNewText();
		}

		//connect on selected text to text controller
		//用来将选中的text关联上text controller
		win.button3.onClick = function()
		{
			LinkCurrentText();
		}

		//Select and traverse a comp, find first comp with text component and jump to it
		//用来选定并遍历某个comp，找到第一个拥有text的comp并跳转过去
		win.button4.onClick = function()
		{
			SearchTextLayer();
		}

		win.layout.layout(true);

		return win

	}

	//Show the panel
	var w = buildUI(thisObj);
	if(w.toString()=="[object Panel]")
	{
		w;
	}
	else
	{
		w.show();
	}

	//MAJOR FUNCTIONS

	function CreateTextController()
	{
		if(GetTextController())
		{
			alert("Text Controller Already Exist");
			return;
		}
		currentMasterFolder = proj.items.addFolder(NAME_Folder);
		currentTextControllerComp = proj.items.addComp(NAME_TextControll,1920,1080,1,10,30);
		currentTextControllerComp.parentFolder = currentMasterFolder;

		currentLocalizationLayer = currentTextControllerComp.layers.addNull();
		currentLocalizationLayer.name = NAME_LocalizationLayer;
	}

	function CreateNewText()
	{
		if(!GetTextController())
		{
			alert("Text Controller Not Exist");
			return;
		}
	}

	function LinkCurrentText()
	{
		if(!GetTextController())
		{
			alert("Text Controller Not Exist");
			return;
		}
	}

	function SearchTextLayer()
	{
		if(!GetTextController())
		{
			alert("Text Controller Not Exist");
			return;
		}
	}

	//UTILITIES


	function GetTextController()
	{
		//Traverse every elements of item, if name is "Sep_TextController, return false"
		//遍历整个item，如果某个item的名字是“Sep_TextController”,则返回false并return
		var projLength = proj.items.length;
		var tempLayerCheck;

		for(var i = 1; i<=projLength;i++)
		{
			if(proj.item(i).name.toString()==NAME_TextControll)
			{
				//currentTextController = proj.item(i);
				tempCompCheck = proj.item(i);
				if(GetLocalizationLayer(i))
				{
					currentTextControllerComp=proj.item(i);
					return true
				}
			}
		}
		currentTextController = null;
		return false;
	}

	function GetLocalizationLayer(inquire)
	{
		var inquireComp = proj.item(inquire);
		for(var j=1;j<=inquireComp.layers.length;j++)
		{
			if(inquireComp.layer(j).name == NAME_LocalizationLayer)
			{
				currentLocalizationLayer=inquireComp.layer(j);
				return true;
			}
		}
		return false;
	}

})(this);