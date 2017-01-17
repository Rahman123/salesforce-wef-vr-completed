<aura:application extends="force:slds">
	<aura:attribute name="configuration" type="Configuration__c" default="{ 'sobjectType': 'Configuration__c', 'Name': 'Test config', 'Id':'a020Y000001AyEKQA0', 'Brief__c': 'a030Y000000s9BzQAI'}"/>
    
    <aura:handler event="c:DropEvent" action="{!c.handleDropEvent}"/>
    
    <c:Draggable id="draggableItem" data="{!v.configuration}">
    	<div style="background:blue; padding:10px; margin:10px;">Drag me</div>
    </c:Draggable>
    
    <c:DropZone id="dz1">
        <div class="dropzone">Drop zone 1</div>
    </c:DropZone>
    <c:DropZone id="dz2">
        <div class="dropzone">Drop zone 2</div>
    </c:DropZone>
    <c:DropZone id="dz3">
        <div class="dropzone">Drop zone 3</div>
    </c:DropZone>
    
</aura:application>