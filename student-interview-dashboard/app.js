// Dashboard Application JavaScript

class StudentDashboard {
  constructor() {
    this.studentsData = [
      {
        id: 1,
        name: "Alex Chen",
        status: "completed",
        coding: 92,
        concepts: 88,
        confidence: 85,
        communication: 90,
        overall: 89,
        interviewDate: "2025-08-30",
        interviewer: "Dr. Smith"
      },
      {
        id: 2,
        name: "Maria Rodriguez",
        status: "in-progress",
        coding: 78,
        concepts: 82,
        confidence: 75,
        communication: 88,
        overall: 81,
        interviewDate: "2025-08-30",
        interviewer: "Prof. Johnson"
      },
      {
        id: 3,
        name: "David Kim",
        status: "completed",
        coding: 95,
        concepts: 92,
        confidence: 88,
        communication: 85,
        overall: 90,
        interviewDate: "2025-08-29",
        interviewer: "Dr. Brown"
      },
      {
        id: 4,
        name: "Sarah Wilson",
        status: "scheduled",
        coding: 0,
        concepts: 0,
        confidence: 0,
        communication: 0,
        overall: 0,
        interviewDate: "2025-08-31",
        interviewer: "Prof. Davis"
      },
      {
        id: 5,
        name: "James Thompson",
        status: "completed",
        coding: 85,
        concepts: 90,
        confidence: 82,
        communication: 87,
        overall: 86,
        interviewDate: "2025-08-29",
        interviewer: "Dr. Smith"
      },
      {
        id: 6,
        name: "Emily Zhang",
        status: "in-progress",
        coding: 88,
        concepts: 85,
        confidence: 90,
        communication: 92,
        overall: 89,
        interviewDate: "2025-08-30",
        interviewer: "Prof. Johnson"
      },
      {
        id: 7,
        name: "Michael Brown",
        status: "completed",
        coding: 72,
        concepts: 78,
        confidence: 70,
        communication: 75,
        overall: 74,
        interviewDate: "2025-08-28",
        interviewer: "Dr. Brown"
      },
      {
        id: 8,
        name: "Lisa Garcia",
        status: "scheduled",
        coding: 0,
        concepts: 0,
        confidence: 0,
        communication: 0,
        overall: 0,
        interviewDate: "2025-09-01",
        interviewer: "Prof. Davis"
      },
      {
        id: 9,
        name: "Ryan Johnson",
        status: "completed",
        coding: 90,
        concepts: 87,
        confidence: 85,
        communication: 89,
        overall: 88,
        interviewDate: "2025-08-28",
        interviewer: "Dr. Smith"
      },
      {
        id: 10,
        name: "Anna Patel",
        status: "in-progress",
        coding: 86,
        concepts: 88,
        confidence: 78,
        communication: 84,
        overall: 84,
        interviewDate: "2025-08-30",
        interviewer: "Prof. Johnson"
      }
    ];

    this.charts = {};
    this.currentFilter = 'all';
    this.currentSort = { column: null, direction: 'asc' };
    this.searchTerm = '';
    
    this.init();
  }

  init() {
    this.updateLastUpdated();
    this.updateStats();
    this.initializeCharts();
    this.renderStudentsTable();
    this.bindEvents();
    this.startLiveUpdates();
  }

  updateLastUpdated() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleTimeString();
  }

  updateStats() {
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');
    const activeStudents = this.studentsData.filter(s => s.status === 'in-progress');
    const totalStudents = this.studentsData.length;
    
    const averageScore = completedStudents.length > 0 
      ? (completedStudents.reduce((sum, s) => sum + s.overall, 0) / completedStudents.length).toFixed(1)
      : 0;
    
    const passRate = completedStudents.length > 0 
      ? Math.round((completedStudents.filter(s => s.overall >= 75).length / completedStudents.length) * 100)
      : 0;

    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('activeInterviews').textContent = activeStudents.length;
    document.getElementById('averageScore').textContent = averageScore;
    document.getElementById('passRate').textContent = `${passRate}%`;
  }

  initializeCharts() {
    this.initRadarChart();
    this.initBarChart();
    this.initLineChart();
    this.initStackedBarChart();
    this.initPieChart();
    this.initScatterChart();
  }

  getCommonChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#1FB8CD',
          borderWidth: 1
        },
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };
  }

  initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');
    
    const avgScores = {
      coding: Math.round(completedStudents.reduce((sum, s) => sum + s.coding, 0) / completedStudents.length),
      concepts: Math.round(completedStudents.reduce((sum, s) => sum + s.concepts, 0) / completedStudents.length),
      confidence: Math.round(completedStudents.reduce((sum, s) => sum + s.confidence, 0) / completedStudents.length),
      communication: Math.round(completedStudents.reduce((sum, s) => sum + s.communication, 0) / completedStudents.length)
    };

    const options = this.getCommonChartOptions();
    options.scales = {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    };
    options.plugins.legend.display = false;

    this.charts.radar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Coding', 'Concepts', 'Confidence', 'Communication'],
        datasets: [{
          label: 'Average Performance',
          data: [avgScores.coding, avgScores.concepts, avgScores.confidence, avgScores.communication],
          backgroundColor: 'rgba(31, 184, 205, 0.2)',
          borderColor: '#1FB8CD',
          borderWidth: 2,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#1FB8CD'
        }]
      },
      options: options
    });
  }

  initBarChart() {
    const ctx = document.getElementById('barChart').getContext('2d');
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');
    
    const avgScores = {
      coding: Math.round(completedStudents.reduce((sum, s) => sum + s.coding, 0) / completedStudents.length),
      concepts: Math.round(completedStudents.reduce((sum, s) => sum + s.concepts, 0) / completedStudents.length),
      confidence: Math.round(completedStudents.reduce((sum, s) => sum + s.confidence, 0) / completedStudents.length),
      communication: Math.round(completedStudents.reduce((sum, s) => sum + s.communication, 0) / completedStudents.length)
    };

    const options = this.getCommonChartOptions();
    options.scales = {
      y: {
        beginAtZero: true,
        max: 100
      }
    };
    options.plugins.legend.display = false;

    this.charts.bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Coding', 'Concepts', 'Confidence', 'Communication'],
        datasets: [{
          label: 'Average Score',
          data: [avgScores.coding, avgScores.concepts, avgScores.confidence, avgScores.communication],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
        }]
      },
      options: options
    });
  }

  initLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    const trendData = [
      { date: "2025-08-25", avgScore: 82 },
      { date: "2025-08-26", avgScore: 84 },
      { date: "2025-08-27", avgScore: 83 },
      { date: "2025-08-28", avgScore: 85 },
      { date: "2025-08-29", avgScore: 88 },
      { date: "2025-08-30", avgScore: 86 }
    ];

    const options = this.getCommonChartOptions();
    options.scales = {
      y: {
        beginAtZero: false,
        min: 75,
        max: 95
      }
    };
    options.plugins.legend.display = false;

    this.charts.line = new Chart(ctx, {
      type: 'line',
      data: {
        labels: trendData.map(d => new Date(d.date).toLocaleDateString()),
        datasets: [{
          label: 'Average Performance',
          data: trendData.map(d => d.avgScore),
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: options
    });
  }

  initStackedBarChart() {
    const ctx = document.getElementById('stackedBarChart').getContext('2d');
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');
    
    const scoreRanges = {
      '0-25': completedStudents.filter(s => s.overall <= 25).length,
      '26-50': completedStudents.filter(s => s.overall > 25 && s.overall <= 50).length,
      '51-75': completedStudents.filter(s => s.overall > 50 && s.overall <= 75).length,
      '76-100': completedStudents.filter(s => s.overall > 75).length
    };

    const options = this.getCommonChartOptions();
    options.scales = {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    };

    this.charts.stackedBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Score Distribution'],
        datasets: [
          {
            label: '0-25',
            data: [scoreRanges['0-25']],
            backgroundColor: '#B4413C'
          },
          {
            label: '26-50',
            data: [scoreRanges['26-50']],
            backgroundColor: '#FFC185'
          },
          {
            label: '51-75',
            data: [scoreRanges['51-75']],
            backgroundColor: '#5D878F'
          },
          {
            label: '76-100',
            data: [scoreRanges['76-100']],
            backgroundColor: '#1FB8CD'
          }
        ]
      },
      options: options
    });
  }

  initPieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    const statusCounts = {
      completed: this.studentsData.filter(s => s.status === 'completed').length,
      'in-progress': this.studentsData.filter(s => s.status === 'in-progress').length,
      scheduled: this.studentsData.filter(s => s.status === 'scheduled').length
    };

    const options = this.getCommonChartOptions();

    this.charts.pie = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Completed', 'In Progress', 'Scheduled'],
        datasets: [{
          data: [statusCounts.completed, statusCounts['in-progress'], statusCounts.scheduled],
          backgroundColor: ['#1FB8CD', '#FFC185', '#5D878F']
        }]
      },
      options: options
    });
  }

  initScatterChart() {
    const ctx = document.getElementById('scatterChart').getContext('2d');
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');

    const options = this.getCommonChartOptions();
    options.scales = {
      x: {
        title: {
          display: true,
          text: 'Coding Score'
        },
        min: 0,
        max: 100
      },
      y: {
        title: {
          display: true,
          text: 'Communication Score'
        },
        min: 0,
        max: 100
      }
    };

    this.charts.scatter = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Coding vs Communication',
          data: completedStudents.map(s => ({x: s.coding, y: s.communication})),
          backgroundColor: '#1FB8CD'
        }]
      },
      options: options
    });
  }

  getFilteredStudents() {
    let filtered = this.studentsData;

    // Apply status filter
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(student => student.status === this.currentFilter);
    }

    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (this.currentSort.column) {
      filtered.sort((a, b) => {
        let aValue = a[this.currentSort.column];
        let bValue = b[this.currentSort.column];

        if (this.currentSort.column === 'interviewDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return this.currentSort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.currentSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }

  renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    const students = this.getFilteredStudents();

    tbody.innerHTML = students.map(student => {
      const statusClass = `status--${student.status}`;
      const scoreClass = (score) => {
        if (score >= 90) return 'score-excellent';
        if (score >= 75) return 'score-good';
        if (score >= 50) return 'score-average';
        return 'score-poor';
      };

      return `
        <tr data-student-id="${student.id}" class="student-row">
          <td>${student.name}</td>
          <td><span class="status ${statusClass}">${student.status.replace('-', ' ')}</span></td>
          <td class="score-cell ${scoreClass(student.coding)}">${student.coding || '-'}</td>
          <td class="score-cell ${scoreClass(student.concepts)}">${student.concepts || '-'}</td>
          <td class="score-cell ${scoreClass(student.confidence)}">${student.confidence || '-'}</td>
          <td class="score-cell ${scoreClass(student.communication)}">${student.communication || '-'}</td>
          <td class="score-cell ${scoreClass(student.overall)}">${student.overall || '-'}</td>
          <td>${new Date(student.interviewDate).toLocaleDateString()}</td>
        </tr>
      `;
    }).join('');

    // Add click events to rows
    this.bindTableRowEvents();
  }

  bindTableRowEvents() {
    document.querySelectorAll('.student-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const studentId = parseInt(row.dataset.studentId);
        this.openStudentModal(studentId);
      });
    });
  }

  bindEvents() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderStudentsTable();
      });
    });

    // Search input - fix the search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.trim();
      this.renderStudentsTable();
    });

    // Sort functionality - fix the sorting
    document.querySelectorAll('.sortable').forEach(header => {
      header.addEventListener('click', (e) => {
        const column = e.target.dataset.sort;
        
        if (this.currentSort.column === column) {
          this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          this.currentSort.column = column;
          this.currentSort.direction = 'asc';
        }

        // Update header classes
        document.querySelectorAll('.sortable').forEach(h => {
          h.classList.remove('sort-asc', 'sort-desc');
        });
        e.target.classList.add(`sort-${this.currentSort.direction}`);

        this.renderStudentsTable();
      });
    });

    // Modal close events
    const modal = document.getElementById('studentModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeStudentModal();
      });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeStudentModal();
      }
    });
  }

  openStudentModal(studentId) {
    const student = this.getStudentById(studentId);
    if (!student) return;

    document.getElementById('modalStudentName').textContent = student.name;
    document.getElementById('modalStatus').textContent = student.status.replace('-', ' ');
    document.getElementById('modalStatus').className = `status status--${student.status}`;
    document.getElementById('modalDate').textContent = new Date(student.interviewDate).toLocaleDateString();
    document.getElementById('modalInterviewer').textContent = student.interviewer;

    // Update score bars
    const scores = {
      coding: student.coding,
      concepts: student.concepts,
      confidence: student.confidence,
      communication: student.communication
    };

    Object.keys(scores).forEach(skill => {
      const score = scores[skill];
      const skillCap = skill.charAt(0).toUpperCase() + skill.slice(1);
      document.getElementById(`modal${skillCap}`).textContent = score;
      document.getElementById(`modal${skillCap}Bar`).style.width = `${score}%`;
    });

    document.getElementById('studentModal').classList.remove('hidden');
  }

  closeStudentModal() {
    document.getElementById('studentModal').classList.add('hidden');
  }

  simulateLiveUpdate() {
    // Randomly update some in-progress students
    const inProgressStudents = this.studentsData.filter(s => s.status === 'in-progress');
    
    inProgressStudents.forEach(student => {
      if (Math.random() < 0.3) { // 30% chance to update each student
        const variation = Math.random() * 6 - 3; // -3 to +3 points
        
        student.coding = Math.max(0, Math.min(100, student.coding + variation));
        student.concepts = Math.max(0, Math.min(100, student.concepts + variation));
        student.confidence = Math.max(0, Math.min(100, student.confidence + variation));
        student.communication = Math.max(0, Math.min(100, student.communication + variation));
        
        student.overall = Math.round((student.coding + student.concepts + student.confidence + student.communication) / 4);
      }
    });

    // Update displays
    this.updateLastUpdated();
    this.updateStats();
    this.updateCharts();
    this.renderStudentsTable();
  }

  updateCharts() {
    // Update radar chart
    const completedStudents = this.studentsData.filter(s => s.status === 'completed');
    const avgScores = {
      coding: Math.round(completedStudents.reduce((sum, s) => sum + s.coding, 0) / completedStudents.length),
      concepts: Math.round(completedStudents.reduce((sum, s) => sum + s.concepts, 0) / completedStudents.length),
      confidence: Math.round(completedStudents.reduce((sum, s) => sum + s.confidence, 0) / completedStudents.length),
      communication: Math.round(completedStudents.reduce((sum, s) => sum + s.communication, 0) / completedStudents.length)
    };

    this.charts.radar.data.datasets[0].data = [
      avgScores.coding, avgScores.concepts, avgScores.confidence, avgScores.communication
    ];
    this.charts.radar.update();

    // Update bar chart
    this.charts.bar.data.datasets[0].data = [
      avgScores.coding, avgScores.concepts, avgScores.confidence, avgScores.communication
    ];
    this.charts.bar.update();

    // Update pie chart
    const statusCounts = {
      completed: this.studentsData.filter(s => s.status === 'completed').length,
      'in-progress': this.studentsData.filter(s => s.status === 'in-progress').length,
      scheduled: this.studentsData.filter(s => s.status === 'scheduled').length
    };

    this.charts.pie.data.datasets[0].data = [
      statusCounts.completed, statusCounts['in-progress'], statusCounts.scheduled
    ];
    this.charts.pie.update();

    // Update scatter chart
    this.charts.scatter.data.datasets[0].data = completedStudents.map(s => ({
      x: s.coding, 
      y: s.communication
    }));
    this.charts.scatter.update();
  }

  startLiveUpdates() {
    setInterval(() => {
      this.simulateLiveUpdate();
    }, 3000); // Update every 3 seconds
  }

  getStudentById(id) {
    return this.studentsData.find(student => student.id === id);
  }
}

// Initialize dashboard when DOM is loaded
let dashboard;

document.addEventListener('DOMContentLoaded', () => {
  dashboard = new StudentDashboard();
});

// Global functions for backwards compatibility (if needed)
function openStudentModal(studentId) {
  if (dashboard) {
    dashboard.openStudentModal(studentId);
  }
}

function closeStudentModal() {
  if (dashboard) {
    dashboard.closeStudentModal();
  }
}

// Prevent text selection issues
document.addEventListener('selectstart', function(e) {
  if (e.target.tagName === 'TH' || e.target.classList.contains('btn')) {
    e.preventDefault();
  }
});