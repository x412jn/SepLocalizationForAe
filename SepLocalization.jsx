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
	//BUILD UI
	function buildUI(thisObj)
	{
		//Define UI contents
		var windowTitle = localize("$$$/AE/Script/SepLocalization/SepAutomaticLocalization=Sep Automaic Localization");
		var firstButton = localize("$$$/AE/Script/SepLocalization/CreateTextController=Create Text Controller");
		var secondButton = localize("$$$/AE/Script/SepLocalization/CreateNewText=Create New Text");
		var thirdButton = localize("$$$/AE/Script/SepLocalization/LinkCurrentText=Link Current Text");

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

		win.button1.onClick = function()
		{
			
		}

		win.button2.onClick = function()
		{

		}

		win.button3.onClick = function()
		{

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

	//UTILITIES



})(this);