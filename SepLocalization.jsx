/*
	EN:
		This script is created by Septim Xia, the purpose is for establishing a automatic localization solution for UA pipeline to boost the production and reduce risk of exporting incidents.
		If you had any issue, please contact septim.xia@pocketsocial.com	
	CN:
		此脚本由Septim Xia创作，目的是建立适用于ua组的一键生成式localization策略以提升效率并减少可能发生的输出意外。
		如果遇到了任何问题，请联络septim.xia@pocketsocial.com
	
	Version 0.0.1:
		Initiating project, create a basic UI layout upon template that provides by AE
*/

(function SepLocalization (thisObj)
{
	//PROJECT PANEL ITEMS

	var proj = app.project;

	var NAME_TextControll = "IGG_UA_TextController";
	var NAME_LocalizationLayer="IGG_UA_Localization";
	var NAME_Folder="IGG_UA_MasterFolder";

	var currentTextControllerComp;
	var currentLocalizationLayer;
	var currentMasterFolder;

	//COMP ITEMS


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

		//用来创建text controller，localization也会在这个comp里面
		win.button1.onClick = function()
		{
			CreateTextController();
		}

		//用来在本comp内新建一个text，同时自动在已有的text controller里面创建一个相同的Text并关联上
		win.button2.onClick = function()
		{
			CreateNewText();
		}

		//用来将选中的text关联上text controller
		win.button3.onClick = function()
		{
			LinkCurrentText();
		}

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
		//遍历整个item，如果某个item的名字是“IGG_UA_TextController”,则返回false并return
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