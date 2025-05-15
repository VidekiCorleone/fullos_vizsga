using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using konzol;

namespace gui
{
    public partial class Form1 : Form
    {
        ServerConnection serverConnection = new ServerConnection();
        List<artData> lista = new List<artData>();
        public Form1()
        {
            InitializeComponent();
            button1.Text = "Regisztráció";
            button1.Click += FormValtas;
            Valami();
            listBox1.Click += Adatok;

        }

        public void FormValtas(object s, EventArgs e)
        {
            Form3 form = new Form3();
            form.Show();
            this.Hide();
        }

        async public void Valami()
        {
            lista = await serverConnection.getArtwork();
            foreach (artData art in lista)
            {
                listBox1.Items.Add($"Neve: {art.title}, értéke: {art.value}.");
            }
        }

        async public void Adatok(object s, EventArgs e)
        {
            lista = await serverConnection.getArtwork();
            int selectedIndex = listBox1.SelectedIndex;
            Form2 form2 = new Form2(lista[selectedIndex].title, lista[selectedIndex].value, lista[selectedIndex].id);
            form2.Show();
            this.Hide();

        }
    }
}
