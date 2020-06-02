setTimeout(function(){
Java.perform(function()
{

console.log("Loaded!\n");


function autoHook(className)
{
	var classInstance = Java.use("java.lang.Class");
	var cl = Java.use(className);

	var cls = Java.cast(cl.class, classInstance);
	var meths = cls.getDeclaredMethods();
	var types = {};
	var arrays = ["[B", "[[B", "[[[B"];
	
	for(var i = 0; i < meths.length; ++i)
	{
		m = meths[i];
		str = m.toGenericString();
		
		parameters = str.split("(")[1].split(")")[0].split(",")
		
		
		var skipped = false;
		var changed = false;
		var function_param_list = "";
		var overload_list = "";
		var f_list = [];
		newParameters = [];
		overloading_list = [];
		for (var j = 0; j < parameters.length; ++j)
		{
			changed = false;
			parameter = parameters[j];
			
			if (parameter == '' || parameter == null || parameter == undefined)
				continue;
			
			if (parameter == 'float')
			{
				changed = true;
			}
			if (parameter == 'float[]')
			{
				parameters[j] = "[F";
			}
			if (parameter == 'float[][]')
			{
				parameters[j] = "[[F";
			}
			if (parameter == 'float[][][]')
			{
				parameters[j] = "[[[F";
			}
			
			if (parameter == 'double')
			{
				changed = true;
			}
			if (parameter == 'double[]')
			{
				parameters[j] = "[D";
			}
			if (parameter == 'double[][]')
			{
				parameters[j] = "[[D";
			}
			if (parameter == 'double[][][]')
			{
				parameters[j] = "[[[D";
			}
			
			
			
			if (parameter == 'boolean')
			{
				changed = true;
			}
			if (parameter == 'boolean[]')
			{
				parameters[j] = "[Z";
			}
			if (parameter == 'boolean[][]')
			{
				parameters[j] = "[[Z";
			}
			if (parameter == 'boolean[][][]')
			{
				parameters[j] = "[[[Z";
			}


			if (parameter == 'byte')
			{
				changed = true;
			}
			if (parameter == 'byte[]')
			{
				parameters[j] = "[B";
			}
			if (parameter == 'byte[][]')
			{
				parameters[j] = "[[B";
			}
			if (parameter == 'byte[][][]')
			{
				parameters[j] = "[[[B";
			}


			if (parameter == 'short')
			{
				changed = true;
			}
			if (parameter == 'short[]')
			{
				parameters[j] = "[S";
			}
			if (parameter == 'short[][]')
			{
				parameters[j] = "[[S";
			}
			if (parameter == 'short[][][]')
			{
				parameters[j] = "[[[S";
			}


			if (parameter == 'char')
			{
				changed = true;
			}
			if (parameter == 'char[]')
			{
				parameters[j] = "[C";
			}
			if (parameter == 'char[][]')
			{
				parameters[j] = "[[C";
			}
			if (parameter == 'char[][][]')
			{
				parameters[j] = "[[[C";
			}


			if (parameter == 'int')
			{
				changed = true;
			}
			if (parameter == 'int[]')
			{
				parameters[j] = "[I";
			}
			if (parameter == 'int[][]')
			{
				parameters[j] = "[[I";
			}
			if (parameter == 'int[][][]')
			{
				parameters[j] = "[[[I";
			}


			if (parameter == 'long')
			{
				changed = true;
			}
			if (parameter == 'long[]')
			{
				parameters[j] = "[J";
			}
			if (parameter == 'long[][]')
			{
				parameters[j] = "[[J";
			}
			if (parameter == 'long[][][]')
			{
				parameters[j] = "[[[J";
			}
			
			if (arrays.indexOf(parameters[j]) >= 0)
			{
				console.log('Skipping method ' + str);
				skipped = true;
				break;
			}
			
			if (changed == false)
			{
				if (parameters[j].includes("java.util.List"))
				{
					console.log(" -- LIST ADDED --");
					parameters[j] = "java.util.List";
					types[parameters[j]] = Java.use("java.util.List");
				}
				else if (parameters[j].includes("java.util.Map"))
				{
					console.log(" -- MAP ADDED --");
					parameters[j] = "java.util.Map";
					types[parameters[j]] = Java.use("java.util.Map");
				}
				else
					types[parameters[j]] = Java.use(parameters[j]);
				overloading_list.push(parameters[j]);
				
				console.log("Overloading: "+str);
			}
			
			
			
			function_param_list += "param_" + j;
			overload_list += "'"+parameters[j]+"'";
			if (j<parameters.length-1)
			{
				function_param_list += ",";
				overload_list += ",";
			}
			
			newParameters.push(parameters[j]);
		}
		
		if (skipped) continue;
		
		
		var method_name = meths[i].getName();
		console.log(method_name + ": " + function_param_list + ":" + overload_list);
		eval(className.split('.').join('_')+"object_"+i+" = cl."+method_name+";");
		var byteArrayA = Java.use('[B');
		arrayToCast = [];
		eval(className.split('.').join('_')+"object_"+i+".overload("+overload_list+").implementation = function( "+function_param_list+" ) { var interList = [];  for(var j = 0; j < "+newParameters.length+"; ++j) { eval('var temp_param = param_'+j+';'); var param_only = overload_list.split(',')[j].split(\"'\").join(''); console.log('Try:'+param_only);  if (overload_list != '' && param_only in types) { console.log('Found in types: '+param_only); interList.push(Java.cast(temp_param, types[param_only])); console.log('CASTED OK'); } else if (overload_list != '') {  console.log('Normal push of: '+param_only); interList.push(temp_param); } } console.log('Ready to apply ----> '+interList); var ret = cl."+method_name+".apply(this, interList);  interList = []; console('Method Called: "+method_name+"'); return ret; }");
	}
	
	for(var c in types){
		console.log("TYPE: " + c);
	}
	
}

var cname = "..your-class...";

c = Java.use(cname);

autoHook(cname);


});
}, 0);
