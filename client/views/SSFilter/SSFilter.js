// ==Builder==
// @uiclass
// @package           ShiftSpaceUI
// @dependencies      SSView
// ==/Builder==

var SSFilter = new Class({

  Extends: SSView,
  name: "SSFilter",

  initialize: function(el, options)
  {
    this.parent(el, options);

    SSAddObserver(this, "onShiftListViewShow", this.onShiftListViewShow.bind(this));
    SSAddObserver(this, "onShiftListViewHide", this.onShiftListViewHide.bind(this));
  },
  
  
  awake: function()
  {
    this.mapOutletsToThis();
    this.attachEvents();
    if(this.options.listView)
    {
      this.setCurrentListView(ShiftSpaceNameTable[this.options.listView]);
    }
  },


  attachEvents: function()
  {
    this.SSFilterQuery.addEvent("keyup", this.handleKey.bind(this));
  },


  setQuery: function(str)
  {
    this.__query = str;
  },


  query: function()
  {
    return this.__query;
  },


  handleKey: function(evt)
  {
    evt = new Event(evt);
    // TODO: ignore non-character keys - David
    $clear(this.currentTimer());
    var query = this.SSFilterQuery.get("value").trim();
    if(query != "")
    {
      this.setCurrentTimer(this.fetch.delay(1000, this));
    }
    else
    {
      this.currentListView().setFilterMode(false);
    }
  },


  currentTimer: function()
  {
    return this.__currentTimer;
  },
  
  
  setCurrentTimer: function(currentTimer)
  {
    this.__currentTimer = currentTimer;
  },


  currentListView: function()
  {
    return this.__currentListView;
  },
  
  
  setCurrentListView: function(currentListView)
  {
    this.__currentListView = currentListView;
  },


  fetch: function()
  {
    var type = this.SSFilterBy.get("value"),
        value = this.SSFilterQuery.get("value"),
        table = this.currentListView().table(),
        url = table.resource().read;

    query = {};
    query[type] = value;
    var datap = SSApp.getUrl(url, {filter: true, query: JSON.encode(query)});

    // REFACTOR: a bit on the hacky side, but I just want to get it working - David
    this.currentListView().setFilterMode(true);
    var controlp = this.currentListView().setData(datap);
    this.currentListView().__reloadData__(controlp);
  },
  

  onShiftListViewShow: function(evt)
  {
  },


  onShiftListViewHide: function(evt)
  {
  }

});