$(document).ready(function(){
    $.getJSON("/api/action/onboarding_followee_list", function(data){
        if (data.success){
            var followList = $("#follow-form-item-list");
            var items = data.result;
            $.each(items, function(idx, item){
                var itemId = "follow-form-item-" + idx;
                var objType = "group";
                if (item.type == "dataset")
                    objType = "dataset";
                followList.prepend(
                    '<li>' +
                    '<input data-module-type="'+ objType +'" ' +
                        'data-module-id="'+ item.id +'" data-module-action="'+ (item.follow ? 'unfollow' : 'follow') +'" ' +
                        'id="'+ itemId +'" type="checkbox" '+ (item.follow ? 'checked' : '') +'>' +
                    '<div></div>' +
                    '<label for="'+ itemId +'" class="regular-text">'+ item.display_name +'</label>' +
                    '<span>'+ item.type +'</span>' +
                    '</li>'
                );
            });

            followList.find('li input').each(function (idx, el){
                $(el).change(function(){
                    var $this = $(this);
                    var action = "follow";
                    if (!$this.is(":checked"))
                        action = "unfollow";
                    var type = $this.attr("data-module-type");
                    var id = $this.attr("data-module-id");

                    var path = "/api/action/" + action + "_" + type;
                    $.post(path, JSON.stringify({id: id}), function(result){
                        console.log(result);
                    }, "json");
                })
            });
        }
    });
});