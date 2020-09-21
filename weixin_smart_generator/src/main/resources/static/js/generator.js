$(function () {
    $("#jqGrid").jqGrid({
        url: 'sys/generator/list',
        datatype: "json",
        colModel: [			
			{ label: '表名', name: 'tableName', width: 100, key: true },
			{ label: 'Engine', name: 'engine', width: 70},
			{ label: '表备注', name: 'tableComment', width: 100 },
			{ label: '创建时间', name: 'createTime', width: 100 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50,100,200],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			tableName: null
		}
	},
	methods: {
		query: function () {
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'tableName': $.trim(vm.q.tableName)},
                page:1 
            }).trigger("reloadGrid");
		},
		generator: function() {
            var tableNames = getSelectedRows();
			if(tableNames == null){
				return ;
			}
            var packageName = vm.q.packageName;
            if(packageName == null){
                alert("请添加包名");
                return ;
            }
            var moduleName = vm.q.moduleName;
            if(moduleName == null){
                alert("请添加模块名");
                return ;
            }
            var author = vm.q.author;
            if(author == null){
                alert("请添加作者");
                return ;
            }
            location.href = "sys/generator/code?tables=" + tableNames.join() + "&packageName=" + packageName + "&moduleName=" + moduleName+ "&author=" + author;
		}
	}
});

