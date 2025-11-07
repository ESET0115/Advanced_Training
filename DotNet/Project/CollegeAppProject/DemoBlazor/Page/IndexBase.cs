using Microsoft.AspNetCore.Components;

namespace DemoBlazor.Page
{
    public class IndexBase : ComponentBase
    {
        public string Text { get; set; } = "Click me";

        protected void ChangeText()
        {
            if(Text == "Click me")
            {
                Text = "You clicked me!";
            }
            
        }
    }
}
